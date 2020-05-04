package app.sindesperdicio.net.ar.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import app.sindesperdicio.net.ar.web.rest.TestUtil;

public class DetailDriverTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetailDriver.class);
        DetailDriver detailDriver1 = new DetailDriver();
        detailDriver1.setId(1L);
        DetailDriver detailDriver2 = new DetailDriver();
        detailDriver2.setId(detailDriver1.getId());
        assertThat(detailDriver1).isEqualTo(detailDriver2);
        detailDriver2.setId(2L);
        assertThat(detailDriver1).isNotEqualTo(detailDriver2);
        detailDriver1.setId(null);
        assertThat(detailDriver1).isNotEqualTo(detailDriver2);
    }
}
