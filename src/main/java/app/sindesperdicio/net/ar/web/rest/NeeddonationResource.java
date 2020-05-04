package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.domain.Needdonation;
import app.sindesperdicio.net.ar.repository.NeeddonationRepository;
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

/**
 * REST controller for managing {@link app.sindesperdicio.net.ar.domain.Needdonation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NeeddonationResource {

    private final Logger log = LoggerFactory.getLogger(NeeddonationResource.class);

    private static final String ENTITY_NAME = "needdonation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NeeddonationRepository needdonationRepository;

    public NeeddonationResource(NeeddonationRepository needdonationRepository) {
        this.needdonationRepository = needdonationRepository;
    }

    /**
     * {@code POST  /needdonations} : Create a new needdonation.
     *
     * @param needdonation the needdonation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new needdonation, or with status {@code 400 (Bad Request)} if the needdonation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/needdonations")
    public ResponseEntity<Needdonation> createNeeddonation(@Valid @RequestBody Needdonation needdonation) throws URISyntaxException {
        log.debug("REST request to save Needdonation : {}", needdonation);
        if (needdonation.getId() != null) {
            throw new BadRequestAlertException("A new needdonation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Needdonation result = needdonationRepository.save(needdonation);
        return ResponseEntity.created(new URI("/api/needdonations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /needdonations} : Updates an existing needdonation.
     *
     * @param needdonation the needdonation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated needdonation,
     * or with status {@code 400 (Bad Request)} if the needdonation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the needdonation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/needdonations")
    public ResponseEntity<Needdonation> updateNeeddonation(@Valid @RequestBody Needdonation needdonation) throws URISyntaxException {
        log.debug("REST request to update Needdonation : {}", needdonation);
        if (needdonation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Needdonation result = needdonationRepository.save(needdonation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, needdonation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /needdonations} : get all the needdonations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of needdonations in body.
     */
    @GetMapping("/needdonations")
    public List<Needdonation> getAllNeeddonations() {
        log.debug("REST request to get all Needdonations");
        return needdonationRepository.findAll();
    }

    /**
     * {@code GET  /needdonations/:id} : get the "id" needdonation.
     *
     * @param id the id of the needdonation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the needdonation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/needdonations/{id}")
    public ResponseEntity<Needdonation> getNeeddonation(@PathVariable Long id) {
        log.debug("REST request to get Needdonation : {}", id);
        Optional<Needdonation> needdonation = needdonationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(needdonation);
    }

    /**
     * {@code DELETE  /needdonations/:id} : delete the "id" needdonation.
     *
     * @param id the id of the needdonation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/needdonations/{id}")
    public ResponseEntity<Void> deleteNeeddonation(@PathVariable Long id) {
        log.debug("REST request to delete Needdonation : {}", id);
        needdonationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
