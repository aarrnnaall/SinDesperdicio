package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.domain.Donations;
import app.sindesperdicio.net.ar.repository.DonationsRepository;
import app.sindesperdicio.net.ar.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link app.sindesperdicio.net.ar.domain.Donations}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DonationsResource {

    private final Logger log = LoggerFactory.getLogger(DonationsResource.class);

    private static final String ENTITY_NAME = "donations";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DonationsRepository donationsRepository;

    public DonationsResource(DonationsRepository donationsRepository) {
        this.donationsRepository = donationsRepository;
    }

    /**
     * {@code POST  /donations} : Create a new donations.
     *
     * @param donations the donations to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new donations, or with status {@code 400 (Bad Request)} if the donations has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/donations")
    public ResponseEntity<Donations> createDonations(@Valid @RequestBody Donations donations) throws URISyntaxException {
        log.debug("REST request to save Donations : {}", donations);
        if (donations.getId() != null) {
            throw new BadRequestAlertException("A new donations cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Donations result = donationsRepository.save(donations);
        return ResponseEntity.created(new URI("/api/donations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /donations} : Updates an existing donations.
     *
     * @param donations the donations to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated donations,
     * or with status {@code 400 (Bad Request)} if the donations is not valid,
     * or with status {@code 500 (Internal Server Error)} if the donations couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/donations")
    public ResponseEntity<Donations> updateDonations(@Valid @RequestBody Donations donations) throws URISyntaxException {
        log.debug("REST request to update Donations : {}", donations);
        if (donations.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Donations result = donationsRepository.save(donations);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, donations.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /donations} : get all the donations.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of donations in body.
     */
    @GetMapping("/donations")
    public List<Donations> getAllDonations(@RequestParam(required = false) String filter,@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("nutrition-is-null".equals(filter)) {
            log.debug("REST request to get all Donationss where nutrition is null");
            return StreamSupport
                .stream(donationsRepository.findAll().spliterator(), false)
                .filter(donations -> donations.getNutrition() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Donations");
        return donationsRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /donations/:id} : get the "id" donations.
     *
     * @param id the id of the donations to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the donations, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/donations/{id}")
    public ResponseEntity<Donations> getDonations(@PathVariable Long id) {
        log.debug("REST request to get Donations : {}", id);
        Optional<Donations> donations = donationsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(donations);
    }

    /**
     * {@code DELETE  /donations/:id} : delete the "id" donations.
     *
     * @param id the id of the donations to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/donations/{id}")
    public ResponseEntity<Void> deleteDonations(@PathVariable Long id) {
        log.debug("REST request to delete Donations : {}", id);
        donationsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
