package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.SinDesperdicioApp;
import app.sindesperdicio.net.ar.domain.Needdonation;
import app.sindesperdicio.net.ar.repository.NeeddonationRepository;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static app.sindesperdicio.net.ar.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import app.sindesperdicio.net.ar.domain.enumeration.TipoDuration;
/**
 * Integration tests for the {@link NeeddonationResource} REST controller.
 */
@SpringBootTest(classes = SinDesperdicioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class NeeddonationResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATESTART = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATESTART = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_DATEEND = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATEEND = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_AVAILABILITYDAY = "AAAAAAAAAA";
    private static final String UPDATED_AVAILABILITYDAY = "BBBBBBBBBB";

    private static final String DEFAULT_AVAILABILITYTIME = "AAAAAAAAAA";
    private static final String UPDATED_AVAILABILITYTIME = "BBBBBBBBBB";

    private static final Integer DEFAULT_LATITUD = 1;
    private static final Integer UPDATED_LATITUD = 2;

    private static final Integer DEFAULT_LONGITUD = 1;
    private static final Integer UPDATED_LONGITUD = 2;

    private static final TipoDuration DEFAULT_DURATION = TipoDuration.Continua;
    private static final TipoDuration UPDATED_DURATION = TipoDuration.Unavez;

    private static final String DEFAULT_INTERVALDURATION = "AAAAAAAAAA";
    private static final String UPDATED_INTERVALDURATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_CANTPEOPLE = 1;
    private static final Integer UPDATED_CANTPEOPLE = 2;

    @Autowired
    private NeeddonationRepository needdonationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNeeddonationMockMvc;

    private Needdonation needdonation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Needdonation createEntity(EntityManager em) {
        Needdonation needdonation = new Needdonation()
            .description(DEFAULT_DESCRIPTION)
            .datestart(DEFAULT_DATESTART)
            .dateend(DEFAULT_DATEEND)
            .availabilityday(DEFAULT_AVAILABILITYDAY)
            .availabilitytime(DEFAULT_AVAILABILITYTIME)
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD)
            .duration(DEFAULT_DURATION)
            .intervalduration(DEFAULT_INTERVALDURATION)
            .cantpeople(DEFAULT_CANTPEOPLE);
        return needdonation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Needdonation createUpdatedEntity(EntityManager em) {
        Needdonation needdonation = new Needdonation()
            .description(UPDATED_DESCRIPTION)
            .datestart(UPDATED_DATESTART)
            .dateend(UPDATED_DATEEND)
            .availabilityday(UPDATED_AVAILABILITYDAY)
            .availabilitytime(UPDATED_AVAILABILITYTIME)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .duration(UPDATED_DURATION)
            .intervalduration(UPDATED_INTERVALDURATION)
            .cantpeople(UPDATED_CANTPEOPLE);
        return needdonation;
    }

    @BeforeEach
    public void initTest() {
        needdonation = createEntity(em);
    }

    @Test
    @Transactional
    public void createNeeddonation() throws Exception {
        int databaseSizeBeforeCreate = needdonationRepository.findAll().size();

        // Create the Needdonation
        restNeeddonationMockMvc.perform(post("/api/needdonations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(needdonation)))
            .andExpect(status().isCreated());

        // Validate the Needdonation in the database
        List<Needdonation> needdonationList = needdonationRepository.findAll();
        assertThat(needdonationList).hasSize(databaseSizeBeforeCreate + 1);
        Needdonation testNeeddonation = needdonationList.get(needdonationList.size() - 1);
        assertThat(testNeeddonation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNeeddonation.getDatestart()).isEqualTo(DEFAULT_DATESTART);
        assertThat(testNeeddonation.getDateend()).isEqualTo(DEFAULT_DATEEND);
        assertThat(testNeeddonation.getAvailabilityday()).isEqualTo(DEFAULT_AVAILABILITYDAY);
        assertThat(testNeeddonation.getAvailabilitytime()).isEqualTo(DEFAULT_AVAILABILITYTIME);
        assertThat(testNeeddonation.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testNeeddonation.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testNeeddonation.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testNeeddonation.getIntervalduration()).isEqualTo(DEFAULT_INTERVALDURATION);
        assertThat(testNeeddonation.getCantpeople()).isEqualTo(DEFAULT_CANTPEOPLE);
    }

    @Test
    @Transactional
    public void createNeeddonationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = needdonationRepository.findAll().size();

        // Create the Needdonation with an existing ID
        needdonation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNeeddonationMockMvc.perform(post("/api/needdonations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(needdonation)))
            .andExpect(status().isBadRequest());

        // Validate the Needdonation in the database
        List<Needdonation> needdonationList = needdonationRepository.findAll();
        assertThat(needdonationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = needdonationRepository.findAll().size();
        // set the field null
        needdonation.setDescription(null);

        // Create the Needdonation, which fails.

        restNeeddonationMockMvc.perform(post("/api/needdonations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(needdonation)))
            .andExpect(status().isBadRequest());

        List<Needdonation> needdonationList = needdonationRepository.findAll();
        assertThat(needdonationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNeeddonations() throws Exception {
        // Initialize the database
        needdonationRepository.saveAndFlush(needdonation);

        // Get all the needdonationList
        restNeeddonationMockMvc.perform(get("/api/needdonations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(needdonation.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].datestart").value(hasItem(sameInstant(DEFAULT_DATESTART))))
            .andExpect(jsonPath("$.[*].dateend").value(hasItem(sameInstant(DEFAULT_DATEEND))))
            .andExpect(jsonPath("$.[*].availabilityday").value(hasItem(DEFAULT_AVAILABILITYDAY)))
            .andExpect(jsonPath("$.[*].availabilitytime").value(hasItem(DEFAULT_AVAILABILITYTIME)))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD)))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.toString())))
            .andExpect(jsonPath("$.[*].intervalduration").value(hasItem(DEFAULT_INTERVALDURATION)))
            .andExpect(jsonPath("$.[*].cantpeople").value(hasItem(DEFAULT_CANTPEOPLE)));
    }
    
    @Test
    @Transactional
    public void getNeeddonation() throws Exception {
        // Initialize the database
        needdonationRepository.saveAndFlush(needdonation);

        // Get the needdonation
        restNeeddonationMockMvc.perform(get("/api/needdonations/{id}", needdonation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(needdonation.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.datestart").value(sameInstant(DEFAULT_DATESTART)))
            .andExpect(jsonPath("$.dateend").value(sameInstant(DEFAULT_DATEEND)))
            .andExpect(jsonPath("$.availabilityday").value(DEFAULT_AVAILABILITYDAY))
            .andExpect(jsonPath("$.availabilitytime").value(DEFAULT_AVAILABILITYTIME))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.toString()))
            .andExpect(jsonPath("$.intervalduration").value(DEFAULT_INTERVALDURATION))
            .andExpect(jsonPath("$.cantpeople").value(DEFAULT_CANTPEOPLE));
    }

    @Test
    @Transactional
    public void getNonExistingNeeddonation() throws Exception {
        // Get the needdonation
        restNeeddonationMockMvc.perform(get("/api/needdonations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNeeddonation() throws Exception {
        // Initialize the database
        needdonationRepository.saveAndFlush(needdonation);

        int databaseSizeBeforeUpdate = needdonationRepository.findAll().size();

        // Update the needdonation
        Needdonation updatedNeeddonation = needdonationRepository.findById(needdonation.getId()).get();
        // Disconnect from session so that the updates on updatedNeeddonation are not directly saved in db
        em.detach(updatedNeeddonation);
        updatedNeeddonation
            .description(UPDATED_DESCRIPTION)
            .datestart(UPDATED_DATESTART)
            .dateend(UPDATED_DATEEND)
            .availabilityday(UPDATED_AVAILABILITYDAY)
            .availabilitytime(UPDATED_AVAILABILITYTIME)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .duration(UPDATED_DURATION)
            .intervalduration(UPDATED_INTERVALDURATION)
            .cantpeople(UPDATED_CANTPEOPLE);

        restNeeddonationMockMvc.perform(put("/api/needdonations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNeeddonation)))
            .andExpect(status().isOk());

        // Validate the Needdonation in the database
        List<Needdonation> needdonationList = needdonationRepository.findAll();
        assertThat(needdonationList).hasSize(databaseSizeBeforeUpdate);
        Needdonation testNeeddonation = needdonationList.get(needdonationList.size() - 1);
        assertThat(testNeeddonation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNeeddonation.getDatestart()).isEqualTo(UPDATED_DATESTART);
        assertThat(testNeeddonation.getDateend()).isEqualTo(UPDATED_DATEEND);
        assertThat(testNeeddonation.getAvailabilityday()).isEqualTo(UPDATED_AVAILABILITYDAY);
        assertThat(testNeeddonation.getAvailabilitytime()).isEqualTo(UPDATED_AVAILABILITYTIME);
        assertThat(testNeeddonation.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testNeeddonation.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testNeeddonation.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testNeeddonation.getIntervalduration()).isEqualTo(UPDATED_INTERVALDURATION);
        assertThat(testNeeddonation.getCantpeople()).isEqualTo(UPDATED_CANTPEOPLE);
    }

    @Test
    @Transactional
    public void updateNonExistingNeeddonation() throws Exception {
        int databaseSizeBeforeUpdate = needdonationRepository.findAll().size();

        // Create the Needdonation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNeeddonationMockMvc.perform(put("/api/needdonations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(needdonation)))
            .andExpect(status().isBadRequest());

        // Validate the Needdonation in the database
        List<Needdonation> needdonationList = needdonationRepository.findAll();
        assertThat(needdonationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNeeddonation() throws Exception {
        // Initialize the database
        needdonationRepository.saveAndFlush(needdonation);

        int databaseSizeBeforeDelete = needdonationRepository.findAll().size();

        // Delete the needdonation
        restNeeddonationMockMvc.perform(delete("/api/needdonations/{id}", needdonation.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Needdonation> needdonationList = needdonationRepository.findAll();
        assertThat(needdonationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
