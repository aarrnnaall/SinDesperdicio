package app.sindesperdicio.net.ar.repository;

import app.sindesperdicio.net.ar.domain.Needdonation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Needdonation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NeeddonationRepository extends JpaRepository<Needdonation, Long> {
}
