package app.sindesperdicio.net.ar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "point_consumption")
    private Boolean pointConsumption;

    @Column(name = "donor")
    private Boolean donor;

    @Column(name = "driver")
    private Boolean driver;

    @Column(name = "admin")
    private Boolean admin;

    @OneToMany(mappedBy = "point")
    private Set<Needdonation> needdonations = new HashSet<>();

    @OneToMany(mappedBy = "donor")
    private Set<Donations> donations = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("roles")
    private User user;

    @OneToOne(mappedBy = "drive")
    @JsonIgnore
    private DetailDriver rol;

    @ManyToOne(cascade=CascadeType.ALL)
    @JsonIgnoreProperties("roles")
    private Branch branch;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isPointConsumption() {
        return pointConsumption;
    }

    public Role pointConsumption(Boolean pointConsumption) {
        this.pointConsumption = pointConsumption;
        return this;
    }

    public void setPointConsumption(Boolean pointConsumption) {
        this.pointConsumption = pointConsumption;
    }

    public Boolean isDonor() {
        return donor;
    }

    public Role donor(Boolean donor) {
        this.donor = donor;
        return this;
    }

    public void setDonor(Boolean donor) {
        this.donor = donor;
    }

    public Boolean isDriver() {
        return driver;
    }

    public Role driver(Boolean driver) {
        this.driver = driver;
        return this;
    }

    public void setDriver(Boolean driver) {
        this.driver = driver;
    }

    public Boolean isAdmin() {
        return admin;
    }

    public Role admin(Boolean admin) {
        this.admin = admin;
        return this;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Set<Needdonation> getNeeddonations() {
        return needdonations;
    }

    public Role needdonations(Set<Needdonation> needdonations) {
        this.needdonations = needdonations;
        return this;
    }

    public Role addNeeddonation(Needdonation needdonation) {
        this.needdonations.add(needdonation);
        needdonation.setPoint(this);
        return this;
    }

    public Role removeNeeddonation(Needdonation needdonation) {
        this.needdonations.remove(needdonation);
        needdonation.setPoint(null);
        return this;
    }

    public void setNeeddonations(Set<Needdonation> needdonations) {
        this.needdonations = needdonations;
    }

    public Set<Donations> getDonations() {
        return donations;
    }

    public Role donations(Set<Donations> donations) {
        this.donations = donations;
        return this;
    }

    public Role addDonation(Donations donations) {
        this.donations.add(donations);
        donations.setDonor(this);
        return this;
    }

    public Role removeDonation(Donations donations) {
        this.donations.remove(donations);
        donations.setDonor(null);
        return this;
    }

    public void setDonations(Set<Donations> donations) {
        this.donations = donations;
    }

    public User getUser() {
        return user;
    }

    public Role user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public DetailDriver getRol() {
        return rol;
    }

    public Role rol(DetailDriver detailDriver) {
        this.rol = detailDriver;
        return this;
    }

    public void setRol(DetailDriver detailDriver) {
        this.rol = detailDriver;
    }

    public Branch getBranch() {
        return branch;
    }

    public Role branch(Branch branch) {
        this.branch = branch;
        return this;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Role)) {
            return false;
        }
        return id != null && id.equals(((Role) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            ", pointConsumption='" + isPointConsumption() + "'" +
            ", donor='" + isDonor() + "'" +
            ", driver='" + isDriver() + "'" +
            ", admin='" + isAdmin() + "'" +
            "}";
    }
}
