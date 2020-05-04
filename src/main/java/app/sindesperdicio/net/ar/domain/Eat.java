package app.sindesperdicio.net.ar.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import app.sindesperdicio.net.ar.domain.enumeration.TipoCate;

/**
 * A Eat.
 */
@Entity
@Table(name = "eat")
public class Eat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private TipoCate category;

    @Column(name = "canteat")
    private Integer canteat;

    @ManyToOne
    @JsonIgnoreProperties("eats")
    private Donations donations;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoCate getCategory() {
        return category;
    }

    public Eat category(TipoCate category) {
        this.category = category;
        return this;
    }

    public void setCategory(TipoCate category) {
        this.category = category;
    }

    public Integer getCanteat() {
        return canteat;
    }

    public Eat canteat(Integer canteat) {
        this.canteat = canteat;
        return this;
    }

    public void setCanteat(Integer canteat) {
        this.canteat = canteat;
    }

    public Donations getDonations() {
        return donations;
    }

    public Eat donations(Donations donations) {
        this.donations = donations;
        return this;
    }

    public void setDonations(Donations donations) {
        this.donations = donations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Eat)) {
            return false;
        }
        return id != null && id.equals(((Eat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Eat{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", canteat=" + getCanteat() +
            "}";
    }
}
