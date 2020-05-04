package app.sindesperdicio.net.ar.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import app.sindesperdicio.net.ar.web.rest.TestUtil;

public class EatTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Eat.class);
        Eat eat1 = new Eat();
        eat1.setId(1L);
        Eat eat2 = new Eat();
        eat2.setId(eat1.getId());
        assertThat(eat1).isEqualTo(eat2);
        eat2.setId(2L);
        assertThat(eat1).isNotEqualTo(eat2);
        eat1.setId(null);
        assertThat(eat1).isNotEqualTo(eat2);
    }
}
