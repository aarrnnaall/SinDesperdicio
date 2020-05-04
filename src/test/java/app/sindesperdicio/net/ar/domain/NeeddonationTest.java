package app.sindesperdicio.net.ar.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import app.sindesperdicio.net.ar.web.rest.TestUtil;

public class NeeddonationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Needdonation.class);
        Needdonation needdonation1 = new Needdonation();
        needdonation1.setId(1L);
        Needdonation needdonation2 = new Needdonation();
        needdonation2.setId(needdonation1.getId());
        assertThat(needdonation1).isEqualTo(needdonation2);
        needdonation2.setId(2L);
        assertThat(needdonation1).isNotEqualTo(needdonation2);
        needdonation1.setId(null);
        assertThat(needdonation1).isNotEqualTo(needdonation2);
    }
}
