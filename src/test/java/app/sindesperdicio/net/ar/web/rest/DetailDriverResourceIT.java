package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.SinDesperdicioApp;
import app.sindesperdicio.net.ar.domain.DetailDriver;
import app.sindesperdicio.net.ar.repository.DetailDriverRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DetailDriverResource} REST controller.
 */
@SpringBootTest(classes = SinDesperdicioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DetailDriverResourceIT {

    private static final String DEFAULT_AVAILABILITYDAY = "AAAAAAAAAA";
    private static final String UPDATED_AVAILABILITYDAY = "BBBBBBBBBB";

    private static final String DEFAULT_AVAILABILITYTIME = "AAAAAAAAAA";
    private static final String UPDATED_AVAILABILITYTIME = "BBBBBBBBBB";

    @Autowired
    private DetailDriverRepository detailDriverRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetailDriverMockMvc;

    private DetailDriver detailDriver;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetailDriver createEntity(EntityManager em) {
        DetailDriver detailDriver = new DetailDriver()
            .availabilityday(DEFAULT_AVAILABILITYDAY)
            .availabilitytime(DEFAULT_AVAILABILITYTIME);
        return detailDriver;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetailDriver createUpdatedEntity(EntityManager em) {
        DetailDriver detailDriver = new DetailDriver()
            .availabilityday(UPDATED_AVAILABILITYDAY)
            .availabilitytime(UPDATED_AVAILABILITYTIME);
        return detailDriver;
    }

    @BeforeEach
    public void initTest() {
        detailDriver = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetailDriver() throws Exception {
        int databaseSizeBeforeCreate = detailDriverRepository.findAll().size();

        // Create the DetailDriver
        restDetailDriverMockMvc.perform(post("/api/detail-drivers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detailDriver)))
            .andExpect(status().isCreated());

        // Validate the DetailDriver in the database
        List<DetailDriver> detailDriverList = detailDriverRepository.findAll();
        assertThat(detailDriverList).hasSize(databaseSizeBeforeCreate + 1);
        DetailDriver testDetailDriver = detailDriverList.get(detailDriverList.size() - 1);
        assertThat(testDetailDriver.getAvailabilityday()).isEqualTo(DEFAULT_AVAILABILITYDAY);
        assertThat(testDetailDriver.getAvailabilitytime()).isEqualTo(DEFAULT_AVAILABILITYTIME);
    }

    @Test
    @Transactional
    public void createDetailDriverWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detailDriverRepository.findAll().size();

        // Create the DetailDriver with an existing ID
        detailDriver.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetailDriverMockMvc.perform(post("/api/detail-drivers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detailDriver)))
            .andExpect(status().isBadRequest());

        // Validate the DetailDriver in the database
        List<DetailDriver> detailDriverList = detailDriverRepository.findAll();
        assertThat(detailDriverList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDetailDrivers() throws Exception {
        // Initialize the database
        detailDriverRepository.saveAndFlush(detailDriver);

        // Get all the detailDriverList
        restDetailDriverMockMvc.perform(get("/api/detail-drivers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detailDriver.getId().intValue())))
            .andExpect(jsonPath("$.[*].availabilityday").value(hasItem(DEFAULT_AVAILABILITYDAY)))
            .andExpect(jsonPath("$.[*].availabilitytime").value(hasItem(DEFAULT_AVAILABILITYTIME)));
    }
    
    @Test
    @Transactional
    public void getDetailDriver() throws Exception {
        // Initialize the database
        detailDriverRepository.saveAndFlush(detailDriver);

        // Get the detailDriver
        restDetailDriverMockMvc.perform(get("/api/detail-drivers/{id}", detailDriver.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detailDriver.getId().intValue()))
            .andExpect(jsonPath("$.availabilityday").value(DEFAULT_AVAILABILITYDAY))
            .andExpect(jsonPath("$.availabilitytime").value(DEFAULT_AVAILABILITYTIME));
    }

    @Test
    @Transactional
    public void getNonExistingDetailDriver() throws Exception {
        // Get the detailDriver
        restDetailDriverMockMvc.perform(get("/api/detail-drivers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetailDriver() throws Exception {
        // Initialize the database
        detailDriverRepository.saveAndFlush(detailDriver);

        int databaseSizeBeforeUpdate = detailDriverRepository.findAll().size();

        // Update the detailDriver
        DetailDriver updatedDetailDriver = detailDriverRepository.findById(detailDriver.getId()).get();
        // Disconnect from session so that the updates on updatedDetailDriver are not directly saved in db
        em.detach(updatedDetailDriver);
        updatedDetailDriver
            .availabilityday(UPDATED_AVAILABILITYDAY)
            .availabilitytime(UPDATED_AVAILABILITYTIME);

        restDetailDriverMockMvc.perform(put("/api/detail-drivers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetailDriver)))
            .andExpect(status().isOk());

        // Validate the DetailDriver in the database
        List<DetailDriver> detailDriverList = detailDriverRepository.findAll();
        assertThat(detailDriverList).hasSize(databaseSizeBeforeUpdate);
        DetailDriver testDetailDriver = detailDriverList.get(detailDriverList.size() - 1);
        assertThat(testDetailDriver.getAvailabilityday()).isEqualTo(UPDATED_AVAILABILITYDAY);
        assertThat(testDetailDriver.getAvailabilitytime()).isEqualTo(UPDATED_AVAILABILITYTIME);
    }

    @Test
    @Transactional
    public void updateNonExistingDetailDriver() throws Exception {
        int databaseSizeBeforeUpdate = detailDriverRepository.findAll().size();

        // Create the DetailDriver

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetailDriverMockMvc.perform(put("/api/detail-drivers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detailDriver)))
            .andExpect(status().isBadRequest());

        // Validate the DetailDriver in the database
        List<DetailDriver> detailDriverList = detailDriverRepository.findAll();
        assertThat(detailDriverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetailDriver() throws Exception {
        // Initialize the database
        detailDriverRepository.saveAndFlush(detailDriver);

        int databaseSizeBeforeDelete = detailDriverRepository.findAll().size();

        // Delete the detailDriver
        restDetailDriverMockMvc.perform(delete("/api/detail-drivers/{id}", detailDriver.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetailDriver> detailDriverList = detailDriverRepository.findAll();
        assertThat(detailDriverList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
