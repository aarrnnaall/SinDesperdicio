package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.SinDesperdicioApp;
import app.sindesperdicio.net.ar.domain.LocationDriver;
import app.sindesperdicio.net.ar.repository.LocationDriverRepository;

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
 * Integration tests for the {@link LocationDriverResource} REST controller.
 */
@SpringBootTest(classes = SinDesperdicioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class LocationDriverResourceIT {

    private static final Integer DEFAULT_LATITUD = 1;
    private static final Integer UPDATED_LATITUD = 2;

    private static final Integer DEFAULT_LONGITUD = 1;
    private static final Integer UPDATED_LONGITUD = 2;

    @Autowired
    private LocationDriverRepository locationDriverRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocationDriverMockMvc;

    private LocationDriver locationDriver;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocationDriver createEntity(EntityManager em) {
        LocationDriver locationDriver = new LocationDriver()
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD);
        return locationDriver;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocationDriver createUpdatedEntity(EntityManager em) {
        LocationDriver locationDriver = new LocationDriver()
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD);
        return locationDriver;
    }

    @BeforeEach
    public void initTest() {
        locationDriver = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocationDriver() throws Exception {
        int databaseSizeBeforeCreate = locationDriverRepository.findAll().size();

        // Create the LocationDriver
        restLocationDriverMockMvc.perform(post("/api/location-drivers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(locationDriver)))
            .andExpect(status().isCreated());

        // Validate the LocationDriver in the database
        List<LocationDriver> locationDriverList = locationDriverRepository.findAll();
        assertThat(locationDriverList).hasSize(databaseSizeBeforeCreate + 1);
        LocationDriver testLocationDriver = locationDriverList.get(locationDriverList.size() - 1);
        assertThat(testLocationDriver.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testLocationDriver.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
    }

    @Test
    @Transactional
    public void createLocationDriverWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = locationDriverRepository.findAll().size();

        // Create the LocationDriver with an existing ID
        locationDriver.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocationDriverMockMvc.perform(post("/api/location-drivers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(locationDriver)))
            .andExpect(status().isBadRequest());

        // Validate the LocationDriver in the database
        List<LocationDriver> locationDriverList = locationDriverRepository.findAll();
        assertThat(locationDriverList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLocationDrivers() throws Exception {
        // Initialize the database
        locationDriverRepository.saveAndFlush(locationDriver);

        // Get all the locationDriverList
        restLocationDriverMockMvc.perform(get("/api/location-drivers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(locationDriver.getId().intValue())))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD)))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD)));
    }
    
    @Test
    @Transactional
    public void getLocationDriver() throws Exception {
        // Initialize the database
        locationDriverRepository.saveAndFlush(locationDriver);

        // Get the locationDriver
        restLocationDriverMockMvc.perform(get("/api/location-drivers/{id}", locationDriver.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(locationDriver.getId().intValue()))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD));
    }

    @Test
    @Transactional
    public void getNonExistingLocationDriver() throws Exception {
        // Get the locationDriver
        restLocationDriverMockMvc.perform(get("/api/location-drivers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocationDriver() throws Exception {
        // Initialize the database
        locationDriverRepository.saveAndFlush(locationDriver);

        int databaseSizeBeforeUpdate = locationDriverRepository.findAll().size();

        // Update the locationDriver
        LocationDriver updatedLocationDriver = locationDriverRepository.findById(locationDriver.getId()).get();
        // Disconnect from session so that the updates on updatedLocationDriver are not directly saved in db
        em.detach(updatedLocationDriver);
        updatedLocationDriver
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD);

        restLocationDriverMockMvc.perform(put("/api/location-drivers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocationDriver)))
            .andExpect(status().isOk());

        // Validate the LocationDriver in the database
        List<LocationDriver> locationDriverList = locationDriverRepository.findAll();
        assertThat(locationDriverList).hasSize(databaseSizeBeforeUpdate);
        LocationDriver testLocationDriver = locationDriverList.get(locationDriverList.size() - 1);
        assertThat(testLocationDriver.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testLocationDriver.getLongitud()).isEqualTo(UPDATED_LONGITUD);
    }

    @Test
    @Transactional
    public void updateNonExistingLocationDriver() throws Exception {
        int databaseSizeBeforeUpdate = locationDriverRepository.findAll().size();

        // Create the LocationDriver

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocationDriverMockMvc.perform(put("/api/location-drivers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(locationDriver)))
            .andExpect(status().isBadRequest());

        // Validate the LocationDriver in the database
        List<LocationDriver> locationDriverList = locationDriverRepository.findAll();
        assertThat(locationDriverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocationDriver() throws Exception {
        // Initialize the database
        locationDriverRepository.saveAndFlush(locationDriver);

        int databaseSizeBeforeDelete = locationDriverRepository.findAll().size();

        // Delete the locationDriver
        restLocationDriverMockMvc.perform(delete("/api/location-drivers/{id}", locationDriver.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocationDriver> locationDriverList = locationDriverRepository.findAll();
        assertThat(locationDriverList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
