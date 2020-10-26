package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.domain.Branch;
import app.sindesperdicio.net.ar.domain.Role;
import app.sindesperdicio.net.ar.domain.User;
import app.sindesperdicio.net.ar.repository.BranchRepository;
import app.sindesperdicio.net.ar.repository.RoleRepository;
import app.sindesperdicio.net.ar.repository.UserRepository;
import app.sindesperdicio.net.ar.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link app.sindesperdicio.net.ar.domain.Role}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RoleResource {

    private final Logger log = LoggerFactory.getLogger(RoleResource.class);

    private static final String ENTITY_NAME = "role";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RoleRepository roleRepository;
    private final BranchRepository branchRepository;
    private final UserRepository userRepository;

    public RoleResource(RoleRepository roleRepository,BranchRepository branchRepository,UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.branchRepository = branchRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /roles} : Create a new role.
     *
     * @param role the role to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new role, or with status {@code 400 (Bad Request)} if the role has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/roles")
    public ResponseEntity<Role> createRole(@RequestBody Role role) throws URISyntaxException {
        log.debug("REST request to save Role : {}", role);
        if (role.getId() != null) {
            throw new BadRequestAlertException("A new role cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Role result = roleRepository.save(role);
        return ResponseEntity.created(new URI("/api/roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /roles} : Updates an existing role.
     *
     * @param role the role to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated role,
     * or with status {@code 400 (Bad Request)} if the role is not valid,
     * or with status {@code 500 (Internal Server Error)} if the role couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/roles")
    public ResponseEntity<Role> updateRole(@RequestBody Role role) throws URISyntaxException {
        log.debug("REST request to update Role : {}", role);
        if (role.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Role result = roleRepository.save(role);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, role.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /roles} : get all the roles.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of roles in body.
     */
    @GetMapping("/roles")
    public List<Role> getAllRoles(@RequestParam(required = false) String filter) {
        if ("rol-is-null".equals(filter)) {
            log.debug("REST request to get all Roles where rol is null");
            return StreamSupport
                .stream(roleRepository.findAll().spliterator(), false)
                .filter(role -> role.getRol() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Roles");
        return roleRepository.findAll();
    }

    /**
     * {@code GET  /roles/:id} : get the "id" role.
     *
     * @param id the id of the role to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the role, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rolesuser/{id}")
    public List<Role> getRoleuser(@PathVariable Long id) {
        log.debug("REST request to get Role : {}", id);
        Optional<Branch> branch = branchRepository.findById(id);
        List<Role> role = roleRepository.findAllByBranch(branch);
        return role;   
    }
    @GetMapping("/roleslogin/{id}")
    public Number getRoleLogin(@PathVariable Long id) {
        log.debug("REST request to get Role By Login : {}", id);
        Optional<User> user = userRepository.findById(id);
        Optional<Role> role = roleRepository.findByUser(user);
        return role.get().getBranch().getId();
    }

    @GetMapping("/roles/{id}")
    public ResponseEntity<Role> getRole(@PathVariable Long id) {
        log.debug("REST request to get Role By User : {}", id);
        Optional<Role> role = roleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(role);
    }

    /**
     * {@code DELETE  /roles/:id} : delete the "id" role.
     *
     * @param id the id of the role to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/roles/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        log.debug("REST request to delete Role : {}", id);
        roleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
