package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.SinDesperdicioApp;
import app.sindesperdicio.net.ar.domain.Eat;
import app.sindesperdicio.net.ar.repository.EatRepository;

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

import app.sindesperdicio.net.ar.domain.enumeration.TipoCate;
/**
 * Integration tests for the {@link EatResource} REST controller.
 */
@SpringBootTest(classes = SinDesperdicioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EatResourceIT {

    private static final TipoCate DEFAULT_CATEGORY = TipoCate.Pan;
    private static final TipoCate UPDATED_CATEGORY = TipoCate.Cereales;

    private static final Integer DEFAULT_CANTEAT = 1;
    private static final Integer UPDATED_CANTEAT = 2;

    @Autowired
    private EatRepository eatRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEatMockMvc;

    private Eat eat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Eat createEntity(EntityManager em) {
        Eat eat = new Eat()
            .category(DEFAULT_CATEGORY)
            .canteat(DEFAULT_CANTEAT);
        return eat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Eat createUpdatedEntity(EntityManager em) {
        Eat eat = new Eat()
            .category(UPDATED_CATEGORY)
            .canteat(UPDATED_CANTEAT);
        return eat;
    }

    @BeforeEach
    public void initTest() {
        eat = createEntity(em);
    }

    @Test
    @Transactional
    public void createEat() throws Exception {
        int databaseSizeBeforeCreate = eatRepository.findAll().size();

        // Create the Eat
        restEatMockMvc.perform(post("/api/eats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eat)))
            .andExpect(status().isCreated());

        // Validate the Eat in the database
        List<Eat> eatList = eatRepository.findAll();
        assertThat(eatList).hasSize(databaseSizeBeforeCreate + 1);
        Eat testEat = eatList.get(eatList.size() - 1);
        assertThat(testEat.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testEat.getCanteat()).isEqualTo(DEFAULT_CANTEAT);
    }

    @Test
    @Transactional
    public void createEatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eatRepository.findAll().size();

        // Create the Eat with an existing ID
        eat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEatMockMvc.perform(post("/api/eats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eat)))
            .andExpect(status().isBadRequest());

        // Validate the Eat in the database
        List<Eat> eatList = eatRepository.findAll();
        assertThat(eatList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEats() throws Exception {
        // Initialize the database
        eatRepository.saveAndFlush(eat);

        // Get all the eatList
        restEatMockMvc.perform(get("/api/eats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eat.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].canteat").value(hasItem(DEFAULT_CANTEAT)));
    }
    
    @Test
    @Transactional
    public void getEat() throws Exception {
        // Initialize the database
        eatRepository.saveAndFlush(eat);

        // Get the eat
        restEatMockMvc.perform(get("/api/eats/{id}", eat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(eat.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.canteat").value(DEFAULT_CANTEAT));
    }

    @Test
    @Transactional
    public void getNonExistingEat() throws Exception {
        // Get the eat
        restEatMockMvc.perform(get("/api/eats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEat() throws Exception {
        // Initialize the database
        eatRepository.saveAndFlush(eat);

        int databaseSizeBeforeUpdate = eatRepository.findAll().size();

        // Update the eat
        Eat updatedEat = eatRepository.findById(eat.getId()).get();
        // Disconnect from session so that the updates on updatedEat are not directly saved in db
        em.detach(updatedEat);
        updatedEat
            .category(UPDATED_CATEGORY)
            .canteat(UPDATED_CANTEAT);

        restEatMockMvc.perform(put("/api/eats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEat)))
            .andExpect(status().isOk());

        // Validate the Eat in the database
        List<Eat> eatList = eatRepository.findAll();
        assertThat(eatList).hasSize(databaseSizeBeforeUpdate);
        Eat testEat = eatList.get(eatList.size() - 1);
        assertThat(testEat.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testEat.getCanteat()).isEqualTo(UPDATED_CANTEAT);
    }

    @Test
    @Transactional
    public void updateNonExistingEat() throws Exception {
        int databaseSizeBeforeUpdate = eatRepository.findAll().size();

        // Create the Eat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEatMockMvc.perform(put("/api/eats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eat)))
            .andExpect(status().isBadRequest());

        // Validate the Eat in the database
        List<Eat> eatList = eatRepository.findAll();
        assertThat(eatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEat() throws Exception {
        // Initialize the database
        eatRepository.saveAndFlush(eat);

        int databaseSizeBeforeDelete = eatRepository.findAll().size();

        // Delete the eat
        restEatMockMvc.perform(delete("/api/eats/{id}", eat.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Eat> eatList = eatRepository.findAll();
        assertThat(eatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
