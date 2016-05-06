/**
 * Test case for the Generate URL Service
 */
package nl.amnl.myinsight.test;

import static nl.amnl.myinsight.javaservices.IConstants.STR_PARAM_REPOSITORY;
import static nl.amnl.myinsight.javaservices.IConstants.STR_PARAM_TICKET;
import static nl.amnl.myinsight.javaservices.IConstants.STR_PARAM_USER;
import static nl.amnl.myinsight.javaservices.IConstants.STR_PARAM_USER_FIRST;
import static nl.amnl.myinsight.test.IContants.STR_DM_TICKET;
import static nl.amnl.myinsight.test.IContants.STR_PASSWORD;
import static nl.amnl.myinsight.test.IContants.STR_REPOSITORY;
import static nl.amnl.myinsight.test.IContants.STR_TEST_URL1;
import static nl.amnl.myinsight.test.IContants.STR_TEST_URL2;
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
	}

	/**
	 * Set the expected value for the tested URL
	 * 
	 * @param url
	 *            is the url to test
	 * @return the expected URL
	 * @throws DfException
	 *             when the session handling fails
	 */
	private String setExpectedValue(String url) throws DfException {
		String userParameter = STR_PARAM_USER_FIRST;
		if (GenerateURLService.hasQuestionMarkParameter(url)) {
			userParameter = STR_PARAM_USER;
		}
		expected = String.format(url + userParameter + STR_PARAM_REPOSITORY
				+ STR_PARAM_TICKET, session.getLoginUserName(),
				session.getDocbaseName(), session.getLoginTicket());
		return expected;
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
			// Test URL1
			setExpectedValue(STR_TEST_URL1);
			doTheTest(STR_TEST_URL1, service);

			// Test URL2
			setExpectedValue(STR_TEST_URL2);
			doTheTest(STR_TEST_URL2, service);
		} catch (DfException e) {
			System.out.println(e.getMessage());
		}
	}

	/**
	 * Execute the test
	 * @param url is the input URL to test
	 * @param service to call the service method
	 * @throws DfException when the session handling fails
	 */
	private void doTheTest(String url, GenerateURLService service)
			throws DfException {
		String actual = service.generateURL(url);
		System.out.println(actual);
		assertEquals(expected.substring(0, expected.indexOf(STR_DM_TICKET)),
				actual.substring(0, actual.indexOf(STR_DM_TICKET)));
	}
}
