package app.sindesperdicio.net.ar.repository;

import app.sindesperdicio.net.ar.domain.DetailDriver;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DetailDriver entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetailDriverRepository extends JpaRepository<DetailDriver, Long> {
}
