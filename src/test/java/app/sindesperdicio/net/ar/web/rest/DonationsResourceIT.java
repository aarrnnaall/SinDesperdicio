package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.SinDesperdicioApp;
import app.sindesperdicio.net.ar.domain.Donations;
import app.sindesperdicio.net.ar.repository.DonationsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static app.sindesperdicio.net.ar.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import app.sindesperdicio.net.ar.domain.enumeration.TipoEat;
import app.sindesperdicio.net.ar.domain.enumeration.TipoDrive;
/**
 * Integration tests for the {@link DonationsResource} REST controller.
 */
@SpringBootTest(classes = SinDesperdicioApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class DonationsResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_LATITUD = 1;
    private static final Integer UPDATED_LATITUD = 2;

    private static final Integer DEFAULT_LONGITUD = 1;
    private static final Integer UPDATED_LONGITUD = 2;

    private static final String DEFAULT_AVAILABILITYDAY = "AAAAAAAAAA";
    private static final String UPDATED_AVAILABILITYDAY = "BBBBBBBBBB";

    private static final String DEFAULT_AVAILABILITYTIME = "AAAAAAAAAA";
    private static final String UPDATED_AVAILABILITYTIME = "BBBBBBBBBB";

    private static final TipoEat DEFAULT_STATUSEAT = TipoEat.Cargado;
    private static final TipoEat UPDATED_STATUSEAT = TipoEat.Apto;

    private static final TipoDrive DEFAULT_STATUSDRIVE = TipoDrive.Cargado;
    private static final TipoDrive UPDATED_STATUSDRIVE = TipoDrive.EnCamino;

    @Autowired
    private DonationsRepository donationsRepository;

    @Mock
    private DonationsRepository donationsRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDonationsMockMvc;

    private Donations donations;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Donations createEntity(EntityManager em) {
        Donations donations = new Donations()
            .description(DEFAULT_DESCRIPTION)
            .date(DEFAULT_DATE)
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD)
            .availabilityday(DEFAULT_AVAILABILITYDAY)
            .availabilitytime(DEFAULT_AVAILABILITYTIME)
            .statuseat(DEFAULT_STATUSEAT)
            .statusdrive(DEFAULT_STATUSDRIVE);
        return donations;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Donations createUpdatedEntity(EntityManager em) {
        Donations donations = new Donations()
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .availabilityday(UPDATED_AVAILABILITYDAY)
            .availabilitytime(UPDATED_AVAILABILITYTIME)
            .statuseat(UPDATED_STATUSEAT)
            .statusdrive(UPDATED_STATUSDRIVE);
        return donations;
    }

    @BeforeEach
    public void initTest() {
        donations = createEntity(em);
    }

    @Test
    @Transactional
    public void createDonations() throws Exception {
        int databaseSizeBeforeCreate = donationsRepository.findAll().size();

        // Create the Donations
        restDonationsMockMvc.perform(post("/api/donations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(donations)))
            .andExpect(status().isCreated());

        // Validate the Donations in the database
        List<Donations> donationsList = donationsRepository.findAll();
        assertThat(donationsList).hasSize(databaseSizeBeforeCreate + 1);
        Donations testDonations = donationsList.get(donationsList.size() - 1);
        assertThat(testDonations.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDonations.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testDonations.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testDonations.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testDonations.getAvailabilityday()).isEqualTo(DEFAULT_AVAILABILITYDAY);
        assertThat(testDonations.getAvailabilitytime()).isEqualTo(DEFAULT_AVAILABILITYTIME);
        assertThat(testDonations.getStatuseat()).isEqualTo(DEFAULT_STATUSEAT);
        assertThat(testDonations.getStatusdrive()).isEqualTo(DEFAULT_STATUSDRIVE);
    }

    @Test
    @Transactional
    public void createDonationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = donationsRepository.findAll().size();

        // Create the Donations with an existing ID
        donations.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDonationsMockMvc.perform(post("/api/donations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(donations)))
            .andExpect(status().isBadRequest());

        // Validate the Donations in the database
        List<Donations> donationsList = donationsRepository.findAll();
        assertThat(donationsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = donationsRepository.findAll().size();
        // set the field null
        donations.setDescription(null);

        // Create the Donations, which fails.

        restDonationsMockMvc.perform(post("/api/donations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(donations)))
            .andExpect(status().isBadRequest());

        List<Donations> donationsList = donationsRepository.findAll();
        assertThat(donationsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDonations() throws Exception {
        // Initialize the database
        donationsRepository.saveAndFlush(donations);

        // Get all the donationsList
        restDonationsMockMvc.perform(get("/api/donations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(donations.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD)))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD)))
            .andExpect(jsonPath("$.[*].availabilityday").value(hasItem(DEFAULT_AVAILABILITYDAY)))
            .andExpect(jsonPath("$.[*].availabilitytime").value(hasItem(DEFAULT_AVAILABILITYTIME)))
            .andExpect(jsonPath("$.[*].statuseat").value(hasItem(DEFAULT_STATUSEAT.toString())))
            .andExpect(jsonPath("$.[*].statusdrive").value(hasItem(DEFAULT_STATUSDRIVE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllDonationsWithEagerRelationshipsIsEnabled() throws Exception {
        DonationsResource donationsResource = new DonationsResource(donationsRepositoryMock);
        when(donationsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDonationsMockMvc.perform(get("/api/donations?eagerload=true"))
            .andExpect(status().isOk());

        verify(donationsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllDonationsWithEagerRelationshipsIsNotEnabled() throws Exception {
        DonationsResource donationsResource = new DonationsResource(donationsRepositoryMock);
        when(donationsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDonationsMockMvc.perform(get("/api/donations?eagerload=true"))
            .andExpect(status().isOk());

        verify(donationsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getDonations() throws Exception {
        // Initialize the database
        donationsRepository.saveAndFlush(donations);

        // Get the donations
        restDonationsMockMvc.perform(get("/api/donations/{id}", donations.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(donations.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD))
            .andExpect(jsonPath("$.availabilityday").value(DEFAULT_AVAILABILITYDAY))
            .andExpect(jsonPath("$.availabilitytime").value(DEFAULT_AVAILABILITYTIME))
            .andExpect(jsonPath("$.statuseat").value(DEFAULT_STATUSEAT.toString()))
            .andExpect(jsonPath("$.statusdrive").value(DEFAULT_STATUSDRIVE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDonations() throws Exception {
        // Get the donations
        restDonationsMockMvc.perform(get("/api/donations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDonations() throws Exception {
        // Initialize the database
        donationsRepository.saveAndFlush(donations);

        int databaseSizeBeforeUpdate = donationsRepository.findAll().size();

        // Update the donations
        Donations updatedDonations = donationsRepository.findById(donations.getId()).get();
        // Disconnect from session so that the updates on updatedDonations are not directly saved in db
        em.detach(updatedDonations);
        updatedDonations
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .availabilityday(UPDATED_AVAILABILITYDAY)
            .availabilitytime(UPDATED_AVAILABILITYTIME)
            .statuseat(UPDATED_STATUSEAT)
            .statusdrive(UPDATED_STATUSDRIVE);

        restDonationsMockMvc.perform(put("/api/donations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDonations)))
            .andExpect(status().isOk());

        // Validate the Donations in the database
        List<Donations> donationsList = donationsRepository.findAll();
        assertThat(donationsList).hasSize(databaseSizeBeforeUpdate);
        Donations testDonations = donationsList.get(donationsList.size() - 1);
        assertThat(testDonations.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDonations.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testDonations.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testDonations.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testDonations.getAvailabilityday()).isEqualTo(UPDATED_AVAILABILITYDAY);
        assertThat(testDonations.getAvailabilitytime()).isEqualTo(UPDATED_AVAILABILITYTIME);
        assertThat(testDonations.getStatuseat()).isEqualTo(UPDATED_STATUSEAT);
        assertThat(testDonations.getStatusdrive()).isEqualTo(UPDATED_STATUSDRIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingDonations() throws Exception {
        int databaseSizeBeforeUpdate = donationsRepository.findAll().size();

        // Create the Donations

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDonationsMockMvc.perform(put("/api/donations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(donations)))
            .andExpect(status().isBadRequest());

        // Validate the Donations in the database
        List<Donations> donationsList = donationsRepository.findAll();
        assertThat(donationsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDonations() throws Exception {
        // Initialize the database
        donationsRepository.saveAndFlush(donations);

        int databaseSizeBeforeDelete = donationsRepository.findAll().size();

        // Delete the donations
        restDonationsMockMvc.perform(delete("/api/donations/{id}", donations.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Donations> donationsList = donationsRepository.findAll();
        assertThat(donationsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
