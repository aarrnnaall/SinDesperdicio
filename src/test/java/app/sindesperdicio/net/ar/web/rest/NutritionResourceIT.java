package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.SinDesperdicioApp;
import app.sindesperdicio.net.ar.domain.Nutrition;
import app.sindesperdicio.net.ar.repository.NutritionRepository;

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
 * Integration tests for the {@link NutritionResource} REST controller.
 */
@SpringBootTest(classes = SinDesperdicioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class NutritionResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Float DEFAULT_WATER = 1F;
    private static final Float UPDATED_WATER = 2F;

    private static final Float DEFAULT_CALORIE = 1F;
    private static final Float UPDATED_CALORIE = 2F;

    private static final Float DEFAULT_PROTEIN = 1F;
    private static final Float UPDATED_PROTEIN = 2F;

    private static final Float DEFAULT_LIPID_TOT = 1F;
    private static final Float UPDATED_LIPID_TOT = 2F;

    private static final Float DEFAULT_ASH = 1F;
    private static final Float UPDATED_ASH = 2F;

    private static final Float DEFAULT_CARBOHYDRT = 1F;
    private static final Float UPDATED_CARBOHYDRT = 2F;

    private static final Float DEFAULT_FIBER = 1F;
    private static final Float UPDATED_FIBER = 2F;

    private static final Float DEFAULT_SUGAR_TOT = 1F;
    private static final Float UPDATED_SUGAR_TOT = 2F;

    private static final Float DEFAULT_CALCIUM = 1F;
    private static final Float UPDATED_CALCIUM = 2F;

    private static final Float DEFAULT_IRON = 1F;
    private static final Float UPDATED_IRON = 2F;

    private static final Float DEFAULT_MAGNESIUM = 1F;
    private static final Float UPDATED_MAGNESIUM = 2F;

    private static final Float DEFAULT_PHOSPHORUS = 1F;
    private static final Float UPDATED_PHOSPHORUS = 2F;

    private static final Float DEFAULT_POTASSIUM = 1F;
    private static final Float UPDATED_POTASSIUM = 2F;

    private static final Float DEFAULT_SODIUM = 1F;
    private static final Float UPDATED_SODIUM = 2F;

    private static final Float DEFAULT_ZINC = 1F;
    private static final Float UPDATED_ZINC = 2F;

    private static final Float DEFAULT_MANGANESE = 1F;
    private static final Float UPDATED_MANGANESE = 2F;

    private static final Float DEFAULT_VIT_C = 1F;
    private static final Float UPDATED_VIT_C = 2F;

    private static final Float DEFAULT_THIAMIN = 1F;
    private static final Float UPDATED_THIAMIN = 2F;

    private static final Float DEFAULT_RIBOFLAVIN = 1F;
    private static final Float UPDATED_RIBOFLAVIN = 2F;

    private static final Float DEFAULT_NIACIN = 1F;
    private static final Float UPDATED_NIACIN = 2F;

    private static final Float DEFAULT_PANTO_ACID = 1F;
    private static final Float UPDATED_PANTO_ACID = 2F;

    private static final Float DEFAULT_VIT_B_6 = 1F;
    private static final Float UPDATED_VIT_B_6 = 2F;

    private static final Float DEFAULT_FOLATE_TOT = 1F;
    private static final Float UPDATED_FOLATE_TOT = 2F;

    private static final Float DEFAULT_FOLIC_ACID = 1F;
    private static final Float UPDATED_FOLIC_ACID = 2F;

    private static final Float DEFAULT_FOOD_FOLATE = 1F;
    private static final Float UPDATED_FOOD_FOLATE = 2F;

    private static final Float DEFAULT_FOLATE_DFE = 1F;
    private static final Float UPDATED_FOLATE_DFE = 2F;

    private static final Float DEFAULT_VHOLINE_TOT = 1F;
    private static final Float UPDATED_VHOLINE_TOT = 2F;

    private static final Float DEFAULT_VIT_B_12 = 1F;
    private static final Float UPDATED_VIT_B_12 = 2F;

    private static final Float DEFAULT_VIT_AIU = 1F;
    private static final Float UPDATED_VIT_AIU = 2F;

    private static final Float DEFAULT_VIT_ARAE = 1F;
    private static final Float UPDATED_VIT_ARAE = 2F;

    private static final Float DEFAULT_VIT_E = 1F;
    private static final Float UPDATED_VIT_E = 2F;

    private static final Float DEFAULT_VIT_D = 1F;
    private static final Float UPDATED_VIT_D = 2F;

    private static final Float DEFAULT_VIT_K = 1F;
    private static final Float UPDATED_VIT_K = 2F;

    @Autowired
    private NutritionRepository nutritionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNutritionMockMvc;

    private Nutrition nutrition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nutrition createEntity(EntityManager em) {
        Nutrition nutrition = new Nutrition()
            .description(DEFAULT_DESCRIPTION)
            .water(DEFAULT_WATER)
            .calorie(DEFAULT_CALORIE)
            .protein(DEFAULT_PROTEIN)
            .lipidTot(DEFAULT_LIPID_TOT)
            .ash(DEFAULT_ASH)
            .carbohydrt(DEFAULT_CARBOHYDRT)
            .fiber(DEFAULT_FIBER)
            .sugarTot(DEFAULT_SUGAR_TOT)
            .calcium(DEFAULT_CALCIUM)
            .iron(DEFAULT_IRON)
            .magnesium(DEFAULT_MAGNESIUM)
            .phosphorus(DEFAULT_PHOSPHORUS)
            .potassium(DEFAULT_POTASSIUM)
            .sodium(DEFAULT_SODIUM)
            .zinc(DEFAULT_ZINC)
            .manganese(DEFAULT_MANGANESE)
            .vitC(DEFAULT_VIT_C)
            .thiamin(DEFAULT_THIAMIN)
            .riboflavin(DEFAULT_RIBOFLAVIN)
            .niacin(DEFAULT_NIACIN)
            .pantoAcid(DEFAULT_PANTO_ACID)
            .vitB6(DEFAULT_VIT_B_6)
            .folateTot(DEFAULT_FOLATE_TOT)
            .folicAcid(DEFAULT_FOLIC_ACID)
            .foodFolate(DEFAULT_FOOD_FOLATE)
            .folateDFE(DEFAULT_FOLATE_DFE)
            .vholineTot(DEFAULT_VHOLINE_TOT)
            .vitB12(DEFAULT_VIT_B_12)
            .vitAIU(DEFAULT_VIT_AIU)
            .vitARAE(DEFAULT_VIT_ARAE)
            .vitE(DEFAULT_VIT_E)
            .vitD(DEFAULT_VIT_D)
            .vitK(DEFAULT_VIT_K);
        return nutrition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nutrition createUpdatedEntity(EntityManager em) {
        Nutrition nutrition = new Nutrition()
            .description(UPDATED_DESCRIPTION)
            .water(UPDATED_WATER)
            .calorie(UPDATED_CALORIE)
            .protein(UPDATED_PROTEIN)
            .lipidTot(UPDATED_LIPID_TOT)
            .ash(UPDATED_ASH)
            .carbohydrt(UPDATED_CARBOHYDRT)
            .fiber(UPDATED_FIBER)
            .sugarTot(UPDATED_SUGAR_TOT)
            .calcium(UPDATED_CALCIUM)
            .iron(UPDATED_IRON)
            .magnesium(UPDATED_MAGNESIUM)
            .phosphorus(UPDATED_PHOSPHORUS)
            .potassium(UPDATED_POTASSIUM)
            .sodium(UPDATED_SODIUM)
            .zinc(UPDATED_ZINC)
            .manganese(UPDATED_MANGANESE)
            .vitC(UPDATED_VIT_C)
            .thiamin(UPDATED_THIAMIN)
            .riboflavin(UPDATED_RIBOFLAVIN)
            .niacin(UPDATED_NIACIN)
            .pantoAcid(UPDATED_PANTO_ACID)
            .vitB6(UPDATED_VIT_B_6)
            .folateTot(UPDATED_FOLATE_TOT)
            .folicAcid(UPDATED_FOLIC_ACID)
            .foodFolate(UPDATED_FOOD_FOLATE)
            .folateDFE(UPDATED_FOLATE_DFE)
            .vholineTot(UPDATED_VHOLINE_TOT)
            .vitB12(UPDATED_VIT_B_12)
            .vitAIU(UPDATED_VIT_AIU)
            .vitARAE(UPDATED_VIT_ARAE)
            .vitE(UPDATED_VIT_E)
            .vitD(UPDATED_VIT_D)
            .vitK(UPDATED_VIT_K);
        return nutrition;
    }

    @BeforeEach
    public void initTest() {
        nutrition = createEntity(em);
    }

    @Test
    @Transactional
    public void createNutrition() throws Exception {
        int databaseSizeBeforeCreate = nutritionRepository.findAll().size();

        // Create the Nutrition
        restNutritionMockMvc.perform(post("/api/nutritions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isCreated());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeCreate + 1);
        Nutrition testNutrition = nutritionList.get(nutritionList.size() - 1);
        assertThat(testNutrition.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNutrition.getWater()).isEqualTo(DEFAULT_WATER);
        assertThat(testNutrition.getCalorie()).isEqualTo(DEFAULT_CALORIE);
        assertThat(testNutrition.getProtein()).isEqualTo(DEFAULT_PROTEIN);
        assertThat(testNutrition.getLipidTot()).isEqualTo(DEFAULT_LIPID_TOT);
        assertThat(testNutrition.getAsh()).isEqualTo(DEFAULT_ASH);
        assertThat(testNutrition.getCarbohydrt()).isEqualTo(DEFAULT_CARBOHYDRT);
        assertThat(testNutrition.getFiber()).isEqualTo(DEFAULT_FIBER);
        assertThat(testNutrition.getSugarTot()).isEqualTo(DEFAULT_SUGAR_TOT);
        assertThat(testNutrition.getCalcium()).isEqualTo(DEFAULT_CALCIUM);
        assertThat(testNutrition.getIron()).isEqualTo(DEFAULT_IRON);
        assertThat(testNutrition.getMagnesium()).isEqualTo(DEFAULT_MAGNESIUM);
        assertThat(testNutrition.getPhosphorus()).isEqualTo(DEFAULT_PHOSPHORUS);
        assertThat(testNutrition.getPotassium()).isEqualTo(DEFAULT_POTASSIUM);
        assertThat(testNutrition.getSodium()).isEqualTo(DEFAULT_SODIUM);
        assertThat(testNutrition.getZinc()).isEqualTo(DEFAULT_ZINC);
        assertThat(testNutrition.getManganese()).isEqualTo(DEFAULT_MANGANESE);
        assertThat(testNutrition.getVitC()).isEqualTo(DEFAULT_VIT_C);
        assertThat(testNutrition.getThiamin()).isEqualTo(DEFAULT_THIAMIN);
        assertThat(testNutrition.getRiboflavin()).isEqualTo(DEFAULT_RIBOFLAVIN);
        assertThat(testNutrition.getNiacin()).isEqualTo(DEFAULT_NIACIN);
        assertThat(testNutrition.getPantoAcid()).isEqualTo(DEFAULT_PANTO_ACID);
        assertThat(testNutrition.getVitB6()).isEqualTo(DEFAULT_VIT_B_6);
        assertThat(testNutrition.getFolateTot()).isEqualTo(DEFAULT_FOLATE_TOT);
        assertThat(testNutrition.getFolicAcid()).isEqualTo(DEFAULT_FOLIC_ACID);
        assertThat(testNutrition.getFoodFolate()).isEqualTo(DEFAULT_FOOD_FOLATE);
        assertThat(testNutrition.getFolateDFE()).isEqualTo(DEFAULT_FOLATE_DFE);
        assertThat(testNutrition.getVholineTot()).isEqualTo(DEFAULT_VHOLINE_TOT);
        assertThat(testNutrition.getVitB12()).isEqualTo(DEFAULT_VIT_B_12);
        assertThat(testNutrition.getVitAIU()).isEqualTo(DEFAULT_VIT_AIU);
        assertThat(testNutrition.getVitARAE()).isEqualTo(DEFAULT_VIT_ARAE);
        assertThat(testNutrition.getVitE()).isEqualTo(DEFAULT_VIT_E);
        assertThat(testNutrition.getVitD()).isEqualTo(DEFAULT_VIT_D);
        assertThat(testNutrition.getVitK()).isEqualTo(DEFAULT_VIT_K);
    }

    @Test
    @Transactional
    public void createNutritionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nutritionRepository.findAll().size();

        // Create the Nutrition with an existing ID
        nutrition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutritionMockMvc.perform(post("/api/nutritions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNutritions() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        // Get all the nutritionList
        restNutritionMockMvc.perform(get("/api/nutritions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutrition.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].water").value(hasItem(DEFAULT_WATER.doubleValue())))
            .andExpect(jsonPath("$.[*].calorie").value(hasItem(DEFAULT_CALORIE.doubleValue())))
            .andExpect(jsonPath("$.[*].protein").value(hasItem(DEFAULT_PROTEIN.doubleValue())))
            .andExpect(jsonPath("$.[*].lipidTot").value(hasItem(DEFAULT_LIPID_TOT.doubleValue())))
            .andExpect(jsonPath("$.[*].ash").value(hasItem(DEFAULT_ASH.doubleValue())))
            .andExpect(jsonPath("$.[*].carbohydrt").value(hasItem(DEFAULT_CARBOHYDRT.doubleValue())))
            .andExpect(jsonPath("$.[*].fiber").value(hasItem(DEFAULT_FIBER.doubleValue())))
            .andExpect(jsonPath("$.[*].sugarTot").value(hasItem(DEFAULT_SUGAR_TOT.doubleValue())))
            .andExpect(jsonPath("$.[*].calcium").value(hasItem(DEFAULT_CALCIUM.doubleValue())))
            .andExpect(jsonPath("$.[*].iron").value(hasItem(DEFAULT_IRON.doubleValue())))
            .andExpect(jsonPath("$.[*].magnesium").value(hasItem(DEFAULT_MAGNESIUM.doubleValue())))
            .andExpect(jsonPath("$.[*].phosphorus").value(hasItem(DEFAULT_PHOSPHORUS.doubleValue())))
            .andExpect(jsonPath("$.[*].potassium").value(hasItem(DEFAULT_POTASSIUM.doubleValue())))
            .andExpect(jsonPath("$.[*].sodium").value(hasItem(DEFAULT_SODIUM.doubleValue())))
            .andExpect(jsonPath("$.[*].zinc").value(hasItem(DEFAULT_ZINC.doubleValue())))
            .andExpect(jsonPath("$.[*].manganese").value(hasItem(DEFAULT_MANGANESE.doubleValue())))
            .andExpect(jsonPath("$.[*].vitC").value(hasItem(DEFAULT_VIT_C.doubleValue())))
            .andExpect(jsonPath("$.[*].thiamin").value(hasItem(DEFAULT_THIAMIN.doubleValue())))
            .andExpect(jsonPath("$.[*].riboflavin").value(hasItem(DEFAULT_RIBOFLAVIN.doubleValue())))
            .andExpect(jsonPath("$.[*].niacin").value(hasItem(DEFAULT_NIACIN.doubleValue())))
            .andExpect(jsonPath("$.[*].pantoAcid").value(hasItem(DEFAULT_PANTO_ACID.doubleValue())))
            .andExpect(jsonPath("$.[*].vitB6").value(hasItem(DEFAULT_VIT_B_6.doubleValue())))
            .andExpect(jsonPath("$.[*].folateTot").value(hasItem(DEFAULT_FOLATE_TOT.doubleValue())))
            .andExpect(jsonPath("$.[*].folicAcid").value(hasItem(DEFAULT_FOLIC_ACID.doubleValue())))
            .andExpect(jsonPath("$.[*].foodFolate").value(hasItem(DEFAULT_FOOD_FOLATE.doubleValue())))
            .andExpect(jsonPath("$.[*].folateDFE").value(hasItem(DEFAULT_FOLATE_DFE.doubleValue())))
            .andExpect(jsonPath("$.[*].vholineTot").value(hasItem(DEFAULT_VHOLINE_TOT.doubleValue())))
            .andExpect(jsonPath("$.[*].vitB12").value(hasItem(DEFAULT_VIT_B_12.doubleValue())))
            .andExpect(jsonPath("$.[*].vitAIU").value(hasItem(DEFAULT_VIT_AIU.doubleValue())))
            .andExpect(jsonPath("$.[*].vitARAE").value(hasItem(DEFAULT_VIT_ARAE.doubleValue())))
            .andExpect(jsonPath("$.[*].vitE").value(hasItem(DEFAULT_VIT_E.doubleValue())))
            .andExpect(jsonPath("$.[*].vitD").value(hasItem(DEFAULT_VIT_D.doubleValue())))
            .andExpect(jsonPath("$.[*].vitK").value(hasItem(DEFAULT_VIT_K.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        // Get the nutrition
        restNutritionMockMvc.perform(get("/api/nutritions/{id}", nutrition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nutrition.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.water").value(DEFAULT_WATER.doubleValue()))
            .andExpect(jsonPath("$.calorie").value(DEFAULT_CALORIE.doubleValue()))
            .andExpect(jsonPath("$.protein").value(DEFAULT_PROTEIN.doubleValue()))
            .andExpect(jsonPath("$.lipidTot").value(DEFAULT_LIPID_TOT.doubleValue()))
            .andExpect(jsonPath("$.ash").value(DEFAULT_ASH.doubleValue()))
            .andExpect(jsonPath("$.carbohydrt").value(DEFAULT_CARBOHYDRT.doubleValue()))
            .andExpect(jsonPath("$.fiber").value(DEFAULT_FIBER.doubleValue()))
            .andExpect(jsonPath("$.sugarTot").value(DEFAULT_SUGAR_TOT.doubleValue()))
            .andExpect(jsonPath("$.calcium").value(DEFAULT_CALCIUM.doubleValue()))
            .andExpect(jsonPath("$.iron").value(DEFAULT_IRON.doubleValue()))
            .andExpect(jsonPath("$.magnesium").value(DEFAULT_MAGNESIUM.doubleValue()))
            .andExpect(jsonPath("$.phosphorus").value(DEFAULT_PHOSPHORUS.doubleValue()))
            .andExpect(jsonPath("$.potassium").value(DEFAULT_POTASSIUM.doubleValue()))
            .andExpect(jsonPath("$.sodium").value(DEFAULT_SODIUM.doubleValue()))
            .andExpect(jsonPath("$.zinc").value(DEFAULT_ZINC.doubleValue()))
            .andExpect(jsonPath("$.manganese").value(DEFAULT_MANGANESE.doubleValue()))
            .andExpect(jsonPath("$.vitC").value(DEFAULT_VIT_C.doubleValue()))
            .andExpect(jsonPath("$.thiamin").value(DEFAULT_THIAMIN.doubleValue()))
            .andExpect(jsonPath("$.riboflavin").value(DEFAULT_RIBOFLAVIN.doubleValue()))
            .andExpect(jsonPath("$.niacin").value(DEFAULT_NIACIN.doubleValue()))
            .andExpect(jsonPath("$.pantoAcid").value(DEFAULT_PANTO_ACID.doubleValue()))
            .andExpect(jsonPath("$.vitB6").value(DEFAULT_VIT_B_6.doubleValue()))
            .andExpect(jsonPath("$.folateTot").value(DEFAULT_FOLATE_TOT.doubleValue()))
            .andExpect(jsonPath("$.folicAcid").value(DEFAULT_FOLIC_ACID.doubleValue()))
            .andExpect(jsonPath("$.foodFolate").value(DEFAULT_FOOD_FOLATE.doubleValue()))
            .andExpect(jsonPath("$.folateDFE").value(DEFAULT_FOLATE_DFE.doubleValue()))
            .andExpect(jsonPath("$.vholineTot").value(DEFAULT_VHOLINE_TOT.doubleValue()))
            .andExpect(jsonPath("$.vitB12").value(DEFAULT_VIT_B_12.doubleValue()))
            .andExpect(jsonPath("$.vitAIU").value(DEFAULT_VIT_AIU.doubleValue()))
            .andExpect(jsonPath("$.vitARAE").value(DEFAULT_VIT_ARAE.doubleValue()))
            .andExpect(jsonPath("$.vitE").value(DEFAULT_VIT_E.doubleValue()))
            .andExpect(jsonPath("$.vitD").value(DEFAULT_VIT_D.doubleValue()))
            .andExpect(jsonPath("$.vitK").value(DEFAULT_VIT_K.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNutrition() throws Exception {
        // Get the nutrition
        restNutritionMockMvc.perform(get("/api/nutritions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();

        // Update the nutrition
        Nutrition updatedNutrition = nutritionRepository.findById(nutrition.getId()).get();
        // Disconnect from session so that the updates on updatedNutrition are not directly saved in db
        em.detach(updatedNutrition);
        updatedNutrition
            .description(UPDATED_DESCRIPTION)
            .water(UPDATED_WATER)
            .calorie(UPDATED_CALORIE)
            .protein(UPDATED_PROTEIN)
            .lipidTot(UPDATED_LIPID_TOT)
            .ash(UPDATED_ASH)
            .carbohydrt(UPDATED_CARBOHYDRT)
            .fiber(UPDATED_FIBER)
            .sugarTot(UPDATED_SUGAR_TOT)
            .calcium(UPDATED_CALCIUM)
            .iron(UPDATED_IRON)
            .magnesium(UPDATED_MAGNESIUM)
            .phosphorus(UPDATED_PHOSPHORUS)
            .potassium(UPDATED_POTASSIUM)
            .sodium(UPDATED_SODIUM)
            .zinc(UPDATED_ZINC)
            .manganese(UPDATED_MANGANESE)
            .vitC(UPDATED_VIT_C)
            .thiamin(UPDATED_THIAMIN)
            .riboflavin(UPDATED_RIBOFLAVIN)
            .niacin(UPDATED_NIACIN)
            .pantoAcid(UPDATED_PANTO_ACID)
            .vitB6(UPDATED_VIT_B_6)
            .folateTot(UPDATED_FOLATE_TOT)
            .folicAcid(UPDATED_FOLIC_ACID)
            .foodFolate(UPDATED_FOOD_FOLATE)
            .folateDFE(UPDATED_FOLATE_DFE)
            .vholineTot(UPDATED_VHOLINE_TOT)
            .vitB12(UPDATED_VIT_B_12)
            .vitAIU(UPDATED_VIT_AIU)
            .vitARAE(UPDATED_VIT_ARAE)
            .vitE(UPDATED_VIT_E)
            .vitD(UPDATED_VIT_D)
            .vitK(UPDATED_VIT_K);

        restNutritionMockMvc.perform(put("/api/nutritions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNutrition)))
            .andExpect(status().isOk());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
        Nutrition testNutrition = nutritionList.get(nutritionList.size() - 1);
        assertThat(testNutrition.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNutrition.getWater()).isEqualTo(UPDATED_WATER);
        assertThat(testNutrition.getCalorie()).isEqualTo(UPDATED_CALORIE);
        assertThat(testNutrition.getProtein()).isEqualTo(UPDATED_PROTEIN);
        assertThat(testNutrition.getLipidTot()).isEqualTo(UPDATED_LIPID_TOT);
        assertThat(testNutrition.getAsh()).isEqualTo(UPDATED_ASH);
        assertThat(testNutrition.getCarbohydrt()).isEqualTo(UPDATED_CARBOHYDRT);
        assertThat(testNutrition.getFiber()).isEqualTo(UPDATED_FIBER);
        assertThat(testNutrition.getSugarTot()).isEqualTo(UPDATED_SUGAR_TOT);
        assertThat(testNutrition.getCalcium()).isEqualTo(UPDATED_CALCIUM);
        assertThat(testNutrition.getIron()).isEqualTo(UPDATED_IRON);
        assertThat(testNutrition.getMagnesium()).isEqualTo(UPDATED_MAGNESIUM);
        assertThat(testNutrition.getPhosphorus()).isEqualTo(UPDATED_PHOSPHORUS);
        assertThat(testNutrition.getPotassium()).isEqualTo(UPDATED_POTASSIUM);
        assertThat(testNutrition.getSodium()).isEqualTo(UPDATED_SODIUM);
        assertThat(testNutrition.getZinc()).isEqualTo(UPDATED_ZINC);
        assertThat(testNutrition.getManganese()).isEqualTo(UPDATED_MANGANESE);
        assertThat(testNutrition.getVitC()).isEqualTo(UPDATED_VIT_C);
        assertThat(testNutrition.getThiamin()).isEqualTo(UPDATED_THIAMIN);
        assertThat(testNutrition.getRiboflavin()).isEqualTo(UPDATED_RIBOFLAVIN);
        assertThat(testNutrition.getNiacin()).isEqualTo(UPDATED_NIACIN);
        assertThat(testNutrition.getPantoAcid()).isEqualTo(UPDATED_PANTO_ACID);
        assertThat(testNutrition.getVitB6()).isEqualTo(UPDATED_VIT_B_6);
        assertThat(testNutrition.getFolateTot()).isEqualTo(UPDATED_FOLATE_TOT);
        assertThat(testNutrition.getFolicAcid()).isEqualTo(UPDATED_FOLIC_ACID);
        assertThat(testNutrition.getFoodFolate()).isEqualTo(UPDATED_FOOD_FOLATE);
        assertThat(testNutrition.getFolateDFE()).isEqualTo(UPDATED_FOLATE_DFE);
        assertThat(testNutrition.getVholineTot()).isEqualTo(UPDATED_VHOLINE_TOT);
        assertThat(testNutrition.getVitB12()).isEqualTo(UPDATED_VIT_B_12);
        assertThat(testNutrition.getVitAIU()).isEqualTo(UPDATED_VIT_AIU);
        assertThat(testNutrition.getVitARAE()).isEqualTo(UPDATED_VIT_ARAE);
        assertThat(testNutrition.getVitE()).isEqualTo(UPDATED_VIT_E);
        assertThat(testNutrition.getVitD()).isEqualTo(UPDATED_VIT_D);
        assertThat(testNutrition.getVitK()).isEqualTo(UPDATED_VIT_K);
    }

    @Test
    @Transactional
    public void updateNonExistingNutrition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();

        // Create the Nutrition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionMockMvc.perform(put("/api/nutritions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        int databaseSizeBeforeDelete = nutritionRepository.findAll().size();

        // Delete the nutrition
        restNutritionMockMvc.perform(delete("/api/nutritions/{id}", nutrition.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
