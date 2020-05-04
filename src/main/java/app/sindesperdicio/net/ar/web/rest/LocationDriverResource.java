package app.sindesperdicio.net.ar.web.rest;

import app.sindesperdicio.net.ar.domain.LocationDriver;
import app.sindesperdicio.net.ar.repository.LocationDriverRepository;
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
 * REST controller for managing {@link app.sindesperdicio.net.ar.domain.LocationDriver}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LocationDriverResource {

    private final Logger log = LoggerFactory.getLogger(LocationDriverResource.class);

    private static final String ENTITY_NAME = "locationDriver";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocationDriverRepository locationDriverRepository;

    public LocationDriverResource(LocationDriverRepository locationDriverRepository) {
        this.locationDriverRepository = locationDriverRepository;
    }

    /**
     * {@code POST  /location-drivers} : Create a new locationDriver.
     *
     * @param locationDriver the locationDriver to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new locationDriver, or with status {@code 400 (Bad Request)} if the locationDriver has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/location-drivers")
    public ResponseEntity<LocationDriver> createLocationDriver(@RequestBody LocationDriver locationDriver) throws URISyntaxException {
        log.debug("REST request to save LocationDriver : {}", locationDriver);
        if (locationDriver.getId() != null) {
            throw new BadRequestAlertException("A new locationDriver cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocationDriver result = locationDriverRepository.save(locationDriver);
        return ResponseEntity.created(new URI("/api/location-drivers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /location-drivers} : Updates an existing locationDriver.
     *
     * @param locationDriver the locationDriver to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated locationDriver,
     * or with status {@code 400 (Bad Request)} if the locationDriver is not valid,
     * or with status {@code 500 (Internal Server Error)} if the locationDriver couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/location-drivers")
    public ResponseEntity<LocationDriver> updateLocationDriver(@RequestBody LocationDriver locationDriver) throws URISyntaxException {
        log.debug("REST request to update LocationDriver : {}", locationDriver);
        if (locationDriver.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocationDriver result = locationDriverRepository.save(locationDriver);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, locationDriver.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /location-drivers} : get all the locationDrivers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of locationDrivers in body.
     */
    @GetMapping("/location-drivers")
    public List<LocationDriver> getAllLocationDrivers() {
        log.debug("REST request to get all LocationDrivers");
        return locationDriverRepository.findAll();
    }

    /**
     * {@code GET  /location-drivers/:id} : get the "id" locationDriver.
     *
     * @param id the id of the locationDriver to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the locationDriver, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/location-drivers/{id}")
    public ResponseEntity<LocationDriver> getLocationDriver(@PathVariable Long id) {
        log.debug("REST request to get LocationDriver : {}", id);
        Optional<LocationDriver> locationDriver = locationDriverRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(locationDriver);
    }

    /**
     * {@code DELETE  /location-drivers/:id} : delete the "id" locationDriver.
     *
     * @param id the id of the locationDriver to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/location-drivers/{id}")
    public ResponseEntity<Void> deleteLocationDriver(@PathVariable Long id) {
        log.debug("REST request to delete LocationDriver : {}", id);
        locationDriverRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
