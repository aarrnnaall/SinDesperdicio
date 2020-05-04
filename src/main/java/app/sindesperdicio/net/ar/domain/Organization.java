package app.sindesperdicio.net.ar.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import app.sindesperdicio.net.ar.domain.enumeration.TipoOrg;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization")
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "razon_social", nullable = false)
    private String razonSocial;

    @NotNull
    @Column(name = "cuit", nullable = false)
    private Integer cuit;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoOrg tipo;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "organization")
    private Set<Branch> braches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public Organization razonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
        return this;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public Integer getCuit() {
        return cuit;
    }

    public Organization cuit(Integer cuit) {
        this.cuit = cuit;
        return this;
    }

    public void setCuit(Integer cuit) {
        this.cuit = cuit;
    }

    public TipoOrg getTipo() {
        return tipo;
    }

    public Organization tipo(TipoOrg tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoOrg tipo) {
        this.tipo = tipo;
    }

    public String getDescription() {
        return description;
    }

    public Organization description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Branch> getBraches() {
        return braches;
    }

    public Organization braches(Set<Branch> branches) {
        this.braches = branches;
        return this;
    }

    public Organization addBrach(Branch branch) {
        this.braches.add(branch);
        branch.setOrganization(this);
        return this;
    }

    public Organization removeBrach(Branch branch) {
        this.braches.remove(branch);
        branch.setOrganization(null);
        return this;
    }

    public void setBraches(Set<Branch> branches) {
        this.braches = branches;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Organization)) {
            return false;
        }
        return id != null && id.equals(((Organization) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Organization{" +
            "id=" + getId() +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", cuit=" + getCuit() +
            ", tipo='" + getTipo() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
