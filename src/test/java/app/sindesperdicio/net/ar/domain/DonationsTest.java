package app.sindesperdicio.net.ar.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import app.sindesperdicio.net.ar.web.rest.TestUtil;

public class DonationsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Donations.class);
        Donations donations1 = new Donations();
        donations1.setId(1L);
        Donations donations2 = new Donations();
        donations2.setId(donations1.getId());
        assertThat(donations1).isEqualTo(donations2);
        donations2.setId(2L);
        assertThat(donations1).isNotEqualTo(donations2);
        donations1.setId(null);
        assertThat(donations1).isNotEqualTo(donations2);
    }
}
