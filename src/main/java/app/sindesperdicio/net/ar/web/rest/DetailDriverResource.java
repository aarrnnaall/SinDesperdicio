package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.domain.DetailDriver;
import app.sindesperdicio.net.ar.repository.DetailDriverRepository;
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

/**
 * REST controller for managing {@link app.sindesperdicio.net.ar.domain.DetailDriver}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DetailDriverResource {

    private final Logger log = LoggerFactory.getLogger(DetailDriverResource.class);

    private static final String ENTITY_NAME = "detailDriver";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetailDriverRepository detailDriverRepository;

    public DetailDriverResource(DetailDriverRepository detailDriverRepository) {
        this.detailDriverRepository = detailDriverRepository;
    }

    /**
     * {@code POST  /detail-drivers} : Create a new detailDriver.
     *
     * @param detailDriver the detailDriver to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detailDriver, or with status {@code 400 (Bad Request)} if the detailDriver has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detail-drivers")
    public ResponseEntity<DetailDriver> createDetailDriver(@RequestBody DetailDriver detailDriver) throws URISyntaxException {
        log.debug("REST request to save DetailDriver : {}", detailDriver);
        if (detailDriver.getId() != null) {
            throw new BadRequestAlertException("A new detailDriver cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetailDriver result = detailDriverRepository.save(detailDriver);
        return ResponseEntity.created(new URI("/api/detail-drivers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detail-drivers} : Updates an existing detailDriver.
     *
     * @param detailDriver the detailDriver to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detailDriver,
     * or with status {@code 400 (Bad Request)} if the detailDriver is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detailDriver couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detail-drivers")
    public ResponseEntity<DetailDriver> updateDetailDriver(@RequestBody DetailDriver detailDriver) throws URISyntaxException {
        log.debug("REST request to update DetailDriver : {}", detailDriver);
        if (detailDriver.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetailDriver result = detailDriverRepository.save(detailDriver);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detailDriver.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detail-drivers} : get all the detailDrivers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detailDrivers in body.
     */
    @GetMapping("/detail-drivers")
    public List<DetailDriver> getAllDetailDrivers() {
        log.debug("REST request to get all DetailDrivers");
        return detailDriverRepository.findAll();
    }

    /**
     * {@code GET  /detail-drivers/:id} : get the "id" detailDriver.
     *
     * @param id the id of the detailDriver to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detailDriver, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detail-drivers/{id}")
    public ResponseEntity<DetailDriver> getDetailDriver(@PathVariable Long id) {
        log.debug("REST request to get DetailDriver : {}", id);
        Optional<DetailDriver> detailDriver = detailDriverRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detailDriver);
    }

    /**
     * {@code DELETE  /detail-drivers/:id} : delete the "id" detailDriver.
     *
     * @param id the id of the detailDriver to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detail-drivers/{id}")
    public ResponseEntity<Void> deleteDetailDriver(@PathVariable Long id) {
        log.debug("REST request to delete DetailDriver : {}", id);
        detailDriverRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
