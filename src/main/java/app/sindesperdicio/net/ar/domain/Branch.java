package app.sindesperdicio.net.ar.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Branch.
 */
@Entity
@Table(name = "branch")
public class Branch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "desription", nullable = false)
    private String desription;

    @Column(name = "latitud")
    private Integer latitud;

    @Column(name = "longitud")
    private Integer longitud;

    @OneToMany(mappedBy = "branch")
    private Set<Role> roles = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("braches")
    private Organization organization;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesription() {
        return desription;
    }

    public Branch desription(String desription) {
        this.desription = desription;
        return this;
    }

    public void setDesription(String desription) {
        this.desription = desription;
    }

    public Integer getLatitud() {
        return latitud;
    }

    public Branch latitud(Integer latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Integer latitud) {
        this.latitud = latitud;
    }

    public Integer getLongitud() {
        return longitud;
    }

    public Branch longitud(Integer longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Integer longitud) {
        this.longitud = longitud;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Branch roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public Branch addRole(Role role) {
        this.roles.add(role);
        role.setBranch(this);
        return this;
    }

    public Branch removeRole(Role role) {
        this.roles.remove(role);
        role.setBranch(null);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Organization getOrganization() {
        return organization;
    }

    public Branch organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Branch)) {
            return false;
        }
        return id != null && id.equals(((Branch) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Branch{" +
            "id=" + getId() +
            ", desription='" + getDesription() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            "}";
    }
}
