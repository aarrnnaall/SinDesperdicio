package app.sindesperdicio.net.ar.repository;

import app.sindesperdicio.net.ar.domain.LocationDriver;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LocationDriver entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocationDriverRepository extends JpaRepository<LocationDriver, Long> {
}
