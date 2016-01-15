/**
 * Test case for the Generate URL Service
 */
package nl.amnl.myinsight.test;

import static nl.amnl.myinsight.test.IContants.STR_PARAM_REPOSITORY;
import static nl.amnl.myinsight.test.IContants.STR_PARAM_TICKET;
import static nl.amnl.myinsight.test.IContants.STR_PARAM_USER;
import static nl.amnl.myinsight.test.IContants.STR_PASSWORD;
import static nl.amnl.myinsight.test.IContants.STR_REPOSITORY;
import static nl.amnl.myinsight.test.IContants.STR_URL;
import static nl.amnl.myinsight.test.IContants.STR_USERNAME;
import static org.junit.Assert.assertEquals;
import nl.amnl.myinsight.common.DFCUtils;
import nl.amnl.myinsight.javaservices.GenerateURLService;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;

/**
 * @author bosa
 *
 */
public class GenerateURLServiceTest {
	private String expected;
	private static DFCUtils dfcUtils;
	private static IDfSession session;

	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		dfcUtils = DFCUtils.getInstance();
		dfcUtils.createSessionManager(STR_REPOSITORY, STR_USERNAME,
				STR_PASSWORD);
		session = dfcUtils.getSessioFromSessionManager(STR_REPOSITORY);
		expected = String.format(STR_URL + STR_PARAM_USER
				+ STR_PARAM_REPOSITORY + STR_PARAM_TICKET,
				session.getLoginUserName(), session.getDocbaseName(),
				session.getLoginTicket());
	}

	/**
	 * @throws java.lang.Exception
	 */
	@After
	public void tearDown() throws Exception {
		dfcUtils.releaseSessioFromSessionManager(session);
	}

	/**
	 * Test method for
	 * {@link nl.amnl.myinsight.javaservices.GenerateURLService#generateURL(java.lang.String)}
	 * .
	 */
	@Test
	public final void testGenerateURL() {
		GenerateURLService service = new GenerateURLService(true);
		service.setSession(session);
		try {
			String actual = service.generateURL(STR_URL);
			assertEquals(expected.substring(0, expected.indexOf("DM_TICKET=")),
					actual.substring(0, actual.indexOf("DM_TICKET=")));
		} catch (DfException e) {
			System.out.println(e.getMessage());
		}
	}
}
