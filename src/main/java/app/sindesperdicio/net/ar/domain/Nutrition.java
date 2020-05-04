package app.sindesperdicio.net.ar.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Nutrition.
 */
@Entity
@Table(name = "nutrition")
public class Nutrition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "water")
    private Float water;

    @Column(name = "calorie")
    private Float calorie;

    @Column(name = "protein")
    private Float protein;

    @Column(name = "lipid_tot")
    private Float lipidTot;

    @Column(name = "ash")
    private Float ash;

    @Column(name = "carbohydrt")
    private Float carbohydrt;

    @Column(name = "fiber")
    private Float fiber;

    @Column(name = "sugar_tot")
    private Float sugarTot;

    @Column(name = "calcium")
    private Float calcium;

    @Column(name = "iron")
    private Float iron;

    @Column(name = "magnesium")
    private Float magnesium;

    @Column(name = "phosphorus")
    private Float phosphorus;

    @Column(name = "potassium")
    private Float potassium;

    @Column(name = "sodium")
    private Float sodium;

    @Column(name = "zinc")
    private Float zinc;

    @Column(name = "manganese")
    private Float manganese;

    @Column(name = "vit_c")
    private Float vitC;

    @Column(name = "thiamin")
    private Float thiamin;

    @Column(name = "riboflavin")
    private Float riboflavin;

    @Column(name = "niacin")
    private Float niacin;

    @Column(name = "panto_acid")
    private Float pantoAcid;

    @Column(name = "vit_b_6")
    private Float vitB6;

    @Column(name = "folate_tot")
    private Float folateTot;

    @Column(name = "folic_acid")
    private Float folicAcid;

    @Column(name = "food_folate")
    private Float foodFolate;

    @Column(name = "folate_dfe")
    private Float folateDFE;

    @Column(name = "vholine_tot")
    private Float vholineTot;

    @Column(name = "vit_b_12")
    private Float vitB12;

    @Column(name = "vit_aiu")
    private Float vitAIU;

    @Column(name = "vit_arae")
    private Float vitARAE;

    @Column(name = "vit_e")
    private Float vitE;

    @Column(name = "vit_d")
    private Float vitD;

    @Column(name = "vit_k")
    private Float vitK;

    @OneToOne
    @JoinColumn(unique = true)
    private Donations donation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Nutrition description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getWater() {
        return water;
    }

    public Nutrition water(Float water) {
        this.water = water;
        return this;
    }

    public void setWater(Float water) {
        this.water = water;
    }

    public Float getCalorie() {
        return calorie;
    }

    public Nutrition calorie(Float calorie) {
        this.calorie = calorie;
        return this;
    }

    public void setCalorie(Float calorie) {
        this.calorie = calorie;
    }

    public Float getProtein() {
        return protein;
    }

    public Nutrition protein(Float protein) {
        this.protein = protein;
        return this;
    }

    public void setProtein(Float protein) {
        this.protein = protein;
    }

    public Float getLipidTot() {
        return lipidTot;
    }

    public Nutrition lipidTot(Float lipidTot) {
        this.lipidTot = lipidTot;
        return this;
    }

    public void setLipidTot(Float lipidTot) {
        this.lipidTot = lipidTot;
    }

    public Float getAsh() {
        return ash;
    }

    public Nutrition ash(Float ash) {
        this.ash = ash;
        return this;
    }

    public void setAsh(Float ash) {
        this.ash = ash;
    }

    public Float getCarbohydrt() {
        return carbohydrt;
    }

    public Nutrition carbohydrt(Float carbohydrt) {
        this.carbohydrt = carbohydrt;
        return this;
    }

    public void setCarbohydrt(Float carbohydrt) {
        this.carbohydrt = carbohydrt;
    }

    public Float getFiber() {
        return fiber;
    }

    public Nutrition fiber(Float fiber) {
        this.fiber = fiber;
        return this;
    }

    public void setFiber(Float fiber) {
        this.fiber = fiber;
    }

    public Float getSugarTot() {
        return sugarTot;
    }

    public Nutrition sugarTot(Float sugarTot) {
        this.sugarTot = sugarTot;
        return this;
    }

    public void setSugarTot(Float sugarTot) {
        this.sugarTot = sugarTot;
    }

    public Float getCalcium() {
        return calcium;
    }

    public Nutrition calcium(Float calcium) {
        this.calcium = calcium;
        return this;
    }

    public void setCalcium(Float calcium) {
        this.calcium = calcium;
    }

    public Float getIron() {
        return iron;
    }

    public Nutrition iron(Float iron) {
        this.iron = iron;
        return this;
    }

    public void setIron(Float iron) {
        this.iron = iron;
    }

    public Float getMagnesium() {
        return magnesium;
    }

    public Nutrition magnesium(Float magnesium) {
        this.magnesium = magnesium;
        return this;
    }

    public void setMagnesium(Float magnesium) {
        this.magnesium = magnesium;
    }

    public Float getPhosphorus() {
        return phosphorus;
    }

    public Nutrition phosphorus(Float phosphorus) {
        this.phosphorus = phosphorus;
        return this;
    }

    public void setPhosphorus(Float phosphorus) {
        this.phosphorus = phosphorus;
    }

    public Float getPotassium() {
        return potassium;
    }

    public Nutrition potassium(Float potassium) {
        this.potassium = potassium;
        return this;
    }

    public void setPotassium(Float potassium) {
        this.potassium = potassium;
    }

    public Float getSodium() {
        return sodium;
    }

    public Nutrition sodium(Float sodium) {
        this.sodium = sodium;
        return this;
    }

    public void setSodium(Float sodium) {
        this.sodium = sodium;
    }

    public Float getZinc() {
        return zinc;
    }

    public Nutrition zinc(Float zinc) {
        this.zinc = zinc;
        return this;
    }

    public void setZinc(Float zinc) {
        this.zinc = zinc;
    }

    public Float getManganese() {
        return manganese;
    }

    public Nutrition manganese(Float manganese) {
        this.manganese = manganese;
        return this;
    }

    public void setManganese(Float manganese) {
        this.manganese = manganese;
    }

    public Float getVitC() {
        return vitC;
    }

    public Nutrition vitC(Float vitC) {
        this.vitC = vitC;
        return this;
    }

    public void setVitC(Float vitC) {
        this.vitC = vitC;
    }

    public Float getThiamin() {
        return thiamin;
    }

    public Nutrition thiamin(Float thiamin) {
        this.thiamin = thiamin;
        return this;
    }

    public void setThiamin(Float thiamin) {
        this.thiamin = thiamin;
    }

    public Float getRiboflavin() {
        return riboflavin;
    }

    public Nutrition riboflavin(Float riboflavin) {
        this.riboflavin = riboflavin;
        return this;
    }

    public void setRiboflavin(Float riboflavin) {
        this.riboflavin = riboflavin;
    }

    public Float getNiacin() {
        return niacin;
    }

    public Nutrition niacin(Float niacin) {
        this.niacin = niacin;
        return this;
    }

    public void setNiacin(Float niacin) {
        this.niacin = niacin;
    }

    public Float getPantoAcid() {
        return pantoAcid;
    }

    public Nutrition pantoAcid(Float pantoAcid) {
        this.pantoAcid = pantoAcid;
        return this;
    }

    public void setPantoAcid(Float pantoAcid) {
        this.pantoAcid = pantoAcid;
    }

    public Float getVitB6() {
        return vitB6;
    }

    public Nutrition vitB6(Float vitB6) {
        this.vitB6 = vitB6;
        return this;
    }

    public void setVitB6(Float vitB6) {
        this.vitB6 = vitB6;
    }

    public Float getFolateTot() {
        return folateTot;
    }

    public Nutrition folateTot(Float folateTot) {
        this.folateTot = folateTot;
        return this;
    }

    public void setFolateTot(Float folateTot) {
        this.folateTot = folateTot;
    }

    public Float getFolicAcid() {
        return folicAcid;
    }

    public Nutrition folicAcid(Float folicAcid) {
        this.folicAcid = folicAcid;
        return this;
    }

    public void setFolicAcid(Float folicAcid) {
        this.folicAcid = folicAcid;
    }

    public Float getFoodFolate() {
        return foodFolate;
    }

    public Nutrition foodFolate(Float foodFolate) {
        this.foodFolate = foodFolate;
        return this;
    }

    public void setFoodFolate(Float foodFolate) {
        this.foodFolate = foodFolate;
    }

    public Float getFolateDFE() {
        return folateDFE;
    }

    public Nutrition folateDFE(Float folateDFE) {
        this.folateDFE = folateDFE;
        return this;
    }

    public void setFolateDFE(Float folateDFE) {
        this.folateDFE = folateDFE;
    }

    public Float getVholineTot() {
        return vholineTot;
    }

    public Nutrition vholineTot(Float vholineTot) {
        this.vholineTot = vholineTot;
        return this;
    }

    public void setVholineTot(Float vholineTot) {
        this.vholineTot = vholineTot;
    }

    public Float getVitB12() {
        return vitB12;
    }

    public Nutrition vitB12(Float vitB12) {
        this.vitB12 = vitB12;
        return this;
    }

    public void setVitB12(Float vitB12) {
        this.vitB12 = vitB12;
    }

    public Float getVitAIU() {
        return vitAIU;
    }

    public Nutrition vitAIU(Float vitAIU) {
        this.vitAIU = vitAIU;
        return this;
    }

    public void setVitAIU(Float vitAIU) {
        this.vitAIU = vitAIU;
    }

    public Float getVitARAE() {
        return vitARAE;
    }

    public Nutrition vitARAE(Float vitARAE) {
        this.vitARAE = vitARAE;
        return this;
    }

    public void setVitARAE(Float vitARAE) {
        this.vitARAE = vitARAE;
    }

    public Float getVitE() {
        return vitE;
    }

    public Nutrition vitE(Float vitE) {
        this.vitE = vitE;
        return this;
    }

    public void setVitE(Float vitE) {
        this.vitE = vitE;
    }

    public Float getVitD() {
        return vitD;
    }

    public Nutrition vitD(Float vitD) {
        this.vitD = vitD;
        return this;
    }

    public void setVitD(Float vitD) {
        this.vitD = vitD;
    }

    public Float getVitK() {
        return vitK;
    }

    public Nutrition vitK(Float vitK) {
        this.vitK = vitK;
        return this;
    }

    public void setVitK(Float vitK) {
        this.vitK = vitK;
    }

    public Donations getDonation() {
        return donation;
    }

    public Nutrition donation(Donations donations) {
        this.donation = donations;
        return this;
    }

    public void setDonation(Donations donations) {
        this.donation = donations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Nutrition)) {
            return false;
        }
        return id != null && id.equals(((Nutrition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Nutrition{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", water=" + getWater() +
            ", calorie=" + getCalorie() +
            ", protein=" + getProtein() +
            ", lipidTot=" + getLipidTot() +
            ", ash=" + getAsh() +
            ", carbohydrt=" + getCarbohydrt() +
            ", fiber=" + getFiber() +
            ", sugarTot=" + getSugarTot() +
            ", calcium=" + getCalcium() +
            ", iron=" + getIron() +
            ", magnesium=" + getMagnesium() +
            ", phosphorus=" + getPhosphorus() +
            ", potassium=" + getPotassium() +
            ", sodium=" + getSodium() +
            ", zinc=" + getZinc() +
            ", manganese=" + getManganese() +
            ", vitC=" + getVitC() +
            ", thiamin=" + getThiamin() +
            ", riboflavin=" + getRiboflavin() +
            ", niacin=" + getNiacin() +
            ", pantoAcid=" + getPantoAcid() +
            ", vitB6=" + getVitB6() +
            ", folateTot=" + getFolateTot() +
            ", folicAcid=" + getFolicAcid() +
            ", foodFolate=" + getFoodFolate() +
            ", folateDFE=" + getFolateDFE() +
            ", vholineTot=" + getVholineTot() +
            ", vitB12=" + getVitB12() +
            ", vitAIU=" + getVitAIU() +
            ", vitARAE=" + getVitARAE() +
            ", vitE=" + getVitE() +
            ", vitD=" + getVitD() +
            ", vitK=" + getVitK() +
            "}";
    }
}
