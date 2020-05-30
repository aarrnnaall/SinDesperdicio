package app.sindesperdicio.net.ar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import app.sindesperdicio.net.ar.domain.enumeration.TipoEat;

import app.sindesperdicio.net.ar.domain.enumeration.TipoDrive;

/**
 * A Donations.
 */
@Entity
@Table(name = "donations")
public class Donations implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "latitud")
    private Integer latitud;

    @Column(name = "longitud")
    private Integer longitud;

    @Column(name = "availabilityday")
    private String availabilityday;

    @Column(name = "availabilitytime")
    private String availabilitytime;

    @Enumerated(EnumType.STRING)
    @Column(name = "statuseat")
    private TipoEat statuseat;

    @Enumerated(EnumType.STRING)
    @Column(name = "statusdrive")
    private TipoDrive statusdrive;

    @Column(name = "duration")
    private String duration;

    @Column(name = "intervalduration")
    private String intervalduration;

    @OneToMany(mappedBy = "donations")
    private Set<Eat> eats = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "donations_needdonation",
               joinColumns = @JoinColumn(name = "donations_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "needdonation_id", referencedColumnName = "id"))
    private Set<Needdonation> needdonations = new HashSet<>();

    @OneToOne(mappedBy = "donation")
    @JsonIgnore
    private Nutrition nutrition;

    @ManyToOne
    @JsonIgnoreProperties("donations")
    private Role donor;

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

    public Donations description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Donations date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getLatitud() {
        return latitud;
    }

    public Donations latitud(Integer latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Integer latitud) {
        this.latitud = latitud;
    }

    public Integer getLongitud() {
        return longitud;
    }

    public Donations longitud(Integer longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Integer longitud) {
        this.longitud = longitud;
    }

    public String getAvailabilityday() {
        return availabilityday;
    }

    public Donations availabilityday(String availabilityday) {
        this.availabilityday = availabilityday;
        return this;
    }

    public void setAvailabilityday(String availabilityday) {
        this.availabilityday = availabilityday;
    }

    public String getAvailabilitytime() {
        return availabilitytime;
    }

    public Donations availabilitytime(String availabilitytime) {
        this.availabilitytime = availabilitytime;
        return this;
    }

    public void setAvailabilitytime(String availabilitytime) {
        this.availabilitytime = availabilitytime;
    }

    public TipoEat getStatuseat() {
        return statuseat;
    }

    public Donations statuseat(TipoEat statuseat) {
        this.statuseat = statuseat;
        return this;
    }

    public void setStatuseat(TipoEat statuseat) {
        this.statuseat = statuseat;
    }

    public TipoDrive getStatusdrive() {
        return statusdrive;
    }

    public Donations statusdrive(TipoDrive statusdrive) {
        this.statusdrive = statusdrive;
        return this;
    }

    public void setStatusdrive(TipoDrive statusdrive) {
        this.statusdrive = statusdrive;
    }

    public String getDuration() {
        return duration;
    }

    public Donations duration(String duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getIntervalduration() {
        return intervalduration;
    }

    public Donations intervalduration(String intervalduration) {
        this.intervalduration = intervalduration;
        return this;
    }

    public void setIntervalduration(String intervalduration) {
        this.intervalduration = intervalduration;
    }

    public Set<Eat> getEats() {
        return eats;
    }

    public Donations eats(Set<Eat> eats) {
        this.eats = eats;
        return this;
    }

    public Donations addEats(Eat eat) {
        this.eats.add(eat);
        eat.setDonations(this);
        return this;
    }

    public Donations removeEats(Eat eat) {
        this.eats.remove(eat);
        eat.setDonations(null);
        return this;
    }

    public void setEats(Set<Eat> eats) {
        this.eats = eats;
    }

    public Set<Needdonation> getNeeddonations() {
        return needdonations;
    }

    public Donations needdonations(Set<Needdonation> needdonations) {
        this.needdonations = needdonations;
        return this;
    }

    public Donations addNeeddonation(Needdonation needdonation) {
        this.needdonations.add(needdonation);
        needdonation.getDonations().add(this);
        return this;
    }

    public Donations removeNeeddonation(Needdonation needdonation) {
        this.needdonations.remove(needdonation);
        needdonation.getDonations().remove(this);
        return this;
    }

    public void setNeeddonations(Set<Needdonation> needdonations) {
        this.needdonations = needdonations;
    }

    public Nutrition getNutrition() {
        return nutrition;
    }

    public Donations nutrition(Nutrition nutrition) {
        this.nutrition = nutrition;
        return this;
    }

    public void setNutrition(Nutrition nutrition) {
        this.nutrition = nutrition;
    }

    public Role getDonor() {
        return donor;
    }

    public Donations donor(Role role) {
        this.donor = role;
        return this;
    }

    public void setDonor(Role role) {
        this.donor = role;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Donations)) {
            return false;
        }
        return id != null && id.equals(((Donations) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Donations{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", availabilityday='" + getAvailabilityday() + "'" +
            ", availabilitytime='" + getAvailabilitytime() + "'" +
            ", statuseat='" + getStatuseat() + "'" +
            ", statusdrive='" + getStatusdrive() + "'" +
            ", duration='" + getDuration() + "'" +
            ", intervalduration='" + getIntervalduration() + "'" +
            "}";
    }
}
