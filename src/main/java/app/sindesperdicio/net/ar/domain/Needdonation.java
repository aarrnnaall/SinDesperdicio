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

import app.sindesperdicio.net.ar.domain.enumeration.TipoDuration;

/**
 * A Needdonation.
 */
@Entity
@Table(name = "needdonation")
public class Needdonation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "datestart")
    private ZonedDateTime datestart;

    @Column(name = "dateend")
    private ZonedDateTime dateend;

    @Column(name = "availabilityday")
    private String availabilityday;

    @Column(name = "availabilitytime")
    private String availabilitytime;

    @Column(name = "latitud")
    private Integer latitud;

    @Column(name = "longitud")
    private Integer longitud;

    @Enumerated(EnumType.STRING)
    @Column(name = "duration")
    private TipoDuration duration;

    @Column(name = "intervalduration")
    private String intervalduration;

    @Column(name = "cantpeople")
    private Integer cantpeople;

    @ManyToOne
    @JsonIgnoreProperties("needdonations")
    private Role point;

    @ManyToMany(mappedBy = "needdonations")
    @JsonIgnore
    private Set<Donations> donations = new HashSet<>();

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

    public Needdonation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getDatestart() {
        return datestart;
    }

    public Needdonation datestart(ZonedDateTime datestart) {
        this.datestart = datestart;
        return this;
    }

    public void setDatestart(ZonedDateTime datestart) {
        this.datestart = datestart;
    }

    public ZonedDateTime getDateend() {
        return dateend;
    }

    public Needdonation dateend(ZonedDateTime dateend) {
        this.dateend = dateend;
        return this;
    }

    public void setDateend(ZonedDateTime dateend) {
        this.dateend = dateend;
    }

    public String getAvailabilityday() {
        return availabilityday;
    }

    public Needdonation availabilityday(String availabilityday) {
        this.availabilityday = availabilityday;
        return this;
    }

    public void setAvailabilityday(String availabilityday) {
        this.availabilityday = availabilityday;
    }

    public String getAvailabilitytime() {
        return availabilitytime;
    }

    public Needdonation availabilitytime(String availabilitytime) {
        this.availabilitytime = availabilitytime;
        return this;
    }

    public void setAvailabilitytime(String availabilitytime) {
        this.availabilitytime = availabilitytime;
    }

    public Integer getLatitud() {
        return latitud;
    }

    public Needdonation latitud(Integer latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Integer latitud) {
        this.latitud = latitud;
    }

    public Integer getLongitud() {
        return longitud;
    }

    public Needdonation longitud(Integer longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Integer longitud) {
        this.longitud = longitud;
    }

    public TipoDuration getDuration() {
        return duration;
    }

    public Needdonation duration(TipoDuration duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(TipoDuration duration) {
        this.duration = duration;
    }

    public String getIntervalduration() {
        return intervalduration;
    }

    public Needdonation intervalduration(String intervalduration) {
        this.intervalduration = intervalduration;
        return this;
    }

    public void setIntervalduration(String intervalduration) {
        this.intervalduration = intervalduration;
    }

    public Integer getCantpeople() {
        return cantpeople;
    }

    public Needdonation cantpeople(Integer cantpeople) {
        this.cantpeople = cantpeople;
        return this;
    }

    public void setCantpeople(Integer cantpeople) {
        this.cantpeople = cantpeople;
    }

    public Role getPoint() {
        return point;
    }

    public Needdonation point(Role role) {
        this.point = role;
        return this;
    }

    public void setPoint(Role role) {
        this.point = role;
    }

    public Set<Donations> getDonations() {
        return donations;
    }

    public Needdonation donations(Set<Donations> donations) {
        this.donations = donations;
        return this;
    }

    public Needdonation addDonation(Donations donations) {
        this.donations.add(donations);
        donations.getNeeddonations().add(this);
        return this;
    }

    public Needdonation removeDonation(Donations donations) {
        this.donations.remove(donations);
        donations.getNeeddonations().remove(this);
        return this;
    }

    public void setDonations(Set<Donations> donations) {
        this.donations = donations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Needdonation)) {
            return false;
        }
        return id != null && id.equals(((Needdonation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Needdonation{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", datestart='" + getDatestart() + "'" +
            ", dateend='" + getDateend() + "'" +
            ", availabilityday='" + getAvailabilityday() + "'" +
            ", availabilitytime='" + getAvailabilitytime() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", duration='" + getDuration() + "'" +
            ", intervalduration='" + getIntervalduration() + "'" +
            ", cantpeople=" + getCantpeople() +
            "}";
    }
}
