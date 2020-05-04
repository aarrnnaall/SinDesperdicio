package app.sindesperdicio.net.ar.repository;

import app.sindesperdicio.net.ar.domain.Role;
import app.sindesperdicio.net.ar.domain.User;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("select role from Role role where role.user.login = ?#{principal.username}")
    List<Role> findByUserIsCurrentUser();
    Optional<Role> findByUser(User user);
}
