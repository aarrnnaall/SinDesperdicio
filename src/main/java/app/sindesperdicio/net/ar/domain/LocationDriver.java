package app.sindesperdicio.net.ar.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A LocationDriver.
 */
@Entity
@Table(name = "location_driver")
public class LocationDriver implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "latitud")
    private Integer latitud;

    @Column(name = "longitud")
    private Integer longitud;

    @ManyToOne
    @JsonIgnoreProperties("locationdrivers")
    private DetailDriver detaildriver;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLatitud() {
        return latitud;
    }

    public LocationDriver latitud(Integer latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Integer latitud) {
        this.latitud = latitud;
    }

    public Integer getLongitud() {
        return longitud;
    }

    public LocationDriver longitud(Integer longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Integer longitud) {
        this.longitud = longitud;
    }

    public DetailDriver getDetaildriver() {
        return detaildriver;
    }

    public LocationDriver detaildriver(DetailDriver detailDriver) {
        this.detaildriver = detailDriver;
        return this;
    }

    public void setDetaildriver(DetailDriver detailDriver) {
        this.detaildriver = detailDriver;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocationDriver)) {
            return false;
        }
        return id != null && id.equals(((LocationDriver) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LocationDriver{" +
            "id=" + getId() +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            "}";
    }
}
