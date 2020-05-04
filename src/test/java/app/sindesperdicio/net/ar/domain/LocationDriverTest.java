package app.sindesperdicio.net.ar.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import app.sindesperdicio.net.ar.web.rest.TestUtil;

public class LocationDriverTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocationDriver.class);
        LocationDriver locationDriver1 = new LocationDriver();
        locationDriver1.setId(1L);
        LocationDriver locationDriver2 = new LocationDriver();
        locationDriver2.setId(locationDriver1.getId());
        assertThat(locationDriver1).isEqualTo(locationDriver2);
        locationDriver2.setId(2L);
        assertThat(locationDriver1).isNotEqualTo(locationDriver2);
        locationDriver1.setId(null);
        assertThat(locationDriver1).isNotEqualTo(locationDriver2);
    }
}
