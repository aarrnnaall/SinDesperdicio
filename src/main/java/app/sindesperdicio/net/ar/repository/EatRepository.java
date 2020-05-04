package app.sindesperdicio.net.ar.repository;

import app.sindesperdicio.net.ar.domain.Eat;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Eat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EatRepository extends JpaRepository<Eat, Long> {
}
