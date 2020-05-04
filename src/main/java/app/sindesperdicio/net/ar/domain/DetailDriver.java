package app.sindesperdicio.net.ar.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A DetailDriver.
 */
@Entity
@Table(name = "detail_driver")
public class DetailDriver implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "availabilityday")
    private String availabilityday;

    @Column(name = "availabilitytime")
    private String availabilitytime;

    @OneToOne
    @JoinColumn(unique = true)
    private Role drive;

    @OneToMany(mappedBy = "detaildriver")
    private Set<LocationDriver> locationdrivers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAvailabilityday() {
        return availabilityday;
    }

    public DetailDriver availabilityday(String availabilityday) {
        this.availabilityday = availabilityday;
        return this;
    }

    public void setAvailabilityday(String availabilityday) {
        this.availabilityday = availabilityday;
    }

    public String getAvailabilitytime() {
        return availabilitytime;
    }

    public DetailDriver availabilitytime(String availabilitytime) {
        this.availabilitytime = availabilitytime;
        return this;
    }

    public void setAvailabilitytime(String availabilitytime) {
        this.availabilitytime = availabilitytime;
    }

    public Role getDrive() {
        return drive;
    }

    public DetailDriver drive(Role role) {
        this.drive = role;
        return this;
    }

    public void setDrive(Role role) {
        this.drive = role;
    }

    public Set<LocationDriver> getLocationdrivers() {
        return locationdrivers;
    }

    public DetailDriver locationdrivers(Set<LocationDriver> locationDrivers) {
        this.locationdrivers = locationDrivers;
        return this;
    }

    public DetailDriver addLocationdriver(LocationDriver locationDriver) {
        this.locationdrivers.add(locationDriver);
        locationDriver.setDetaildriver(this);
        return this;
    }

    public DetailDriver removeLocationdriver(LocationDriver locationDriver) {
        this.locationdrivers.remove(locationDriver);
        locationDriver.setDetaildriver(null);
        return this;
    }

    public void setLocationdrivers(Set<LocationDriver> locationDrivers) {
        this.locationdrivers = locationDrivers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetailDriver)) {
            return false;
        }
        return id != null && id.equals(((DetailDriver) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetailDriver{" +
            "id=" + getId() +
            ", availabilityday='" + getAvailabilityday() + "'" +
            ", availabilitytime='" + getAvailabilitytime() + "'" +
            "}";
    }
}
