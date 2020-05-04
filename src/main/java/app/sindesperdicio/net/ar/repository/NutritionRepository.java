package app.sindesperdicio.net.ar.repository;

import app.sindesperdicio.net.ar.domain.Nutrition;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Nutrition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionRepository extends JpaRepository<Nutrition, Long> {
}
