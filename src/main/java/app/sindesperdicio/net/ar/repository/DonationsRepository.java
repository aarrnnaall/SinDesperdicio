package app.sindesperdicio.net.ar.repository;

import app.sindesperdicio.net.ar.domain.Donations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Donations entity.
 */
@Repository
public interface DonationsRepository extends JpaRepository<Donations, Long> {

    @Query(value = "select distinct donations from Donations donations left join fetch donations.needdonations",
        countQuery = "select count(distinct donations) from Donations donations")
    Page<Donations> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct donations from Donations donations left join fetch donations.needdonations")
    List<Donations> findAllWithEagerRelationships();

    @Query("select donations from Donations donations left join fetch donations.needdonations where donations.id =:id")
    Optional<Donations> findOneWithEagerRelationships(@Param("id") Long id);
}
