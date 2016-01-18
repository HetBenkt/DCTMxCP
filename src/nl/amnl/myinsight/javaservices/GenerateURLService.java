/**
 * Generates a correct URL to connect to MyInsight for Documentum
 * Note to compile with Java 7 as Java 8 gives errors in xCP Designer!
 */
package nl.amnl.myinsight.javaservices;

import static nl.amnl.myinsight.javaservices.IContants.STR_END;
import static nl.amnl.myinsight.javaservices.IContants.STR_INPUT_PARAM;
import static nl.amnl.myinsight.javaservices.IContants.STR_OUTPUT_PARAM;
import static nl.amnl.myinsight.javaservices.IContants.STR_PARAM_REPOSITORY;
import static nl.amnl.myinsight.javaservices.IContants.STR_PARAM_TICKET;
import static nl.amnl.myinsight.javaservices.IContants.STR_PARAM_USER;
import static nl.amnl.myinsight.javaservices.IContants.STR_PARAM_USER_FIRST;
import static nl.amnl.myinsight.javaservices.IContants.STR_QUESTION_MARK;
import static nl.amnl.myinsight.javaservices.IContants.STR_SERVICE;
import static nl.amnl.myinsight.javaservices.IContants.STR_SESSION_UP;
import static nl.amnl.myinsight.javaservices.IContants.STR_START;

import com.documentum.fc.client.DfSingleDocbaseModule;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;
import com.documentum.fc.common.DfLogger;

/**
 * @author bosa
 *
 */
public class GenerateURLService extends DfSingleDocbaseModule {
	private IDfSession session = null;
	private boolean isUnitTest = false;

	/**
	 * Default constructor for BOF module to be loaded; Avoids the error:
	 * [DM_VEL_INSTANTIATION_ERROR] -> "Cannot instantiate Java class"
	 */
	public GenerateURLService() {
		super();
	}

	/**
	 * Helper constructor for the JUnit test
	 * 
	 * @param isUnitTest
	 *            is to determine we run from a JUnit test; The session is then
	 *            created differently
	 */
	public GenerateURLService(boolean isUnitTest) {
		super();
		this.isUnitTest = isUnitTest;
	}

	/**
	 * Adds the additional parameters to the URL for MyInsight
	 * 
	 * @param url
	 *            is the start url from where we add the additional parameters
	 *            e.g. http://SERVER:PORT/eDRG/?openreport=/eDRG/Categories/
	 *            Standard Reports/Repository Reports/Repository
	 *            Configuration/Repository Configuration
	 * @return the url with all the additional parameters and values
	 * @throws DfException
	 *             when a dfc call goes wrong
	 */
	public String generateURL(String url) throws DfException {
		DfLogger.info(this, String.format(STR_SERVICE + STR_START, this
				.getClass().getSimpleName()), null, null);
		DfLogger.info(this, String.format(STR_INPUT_PARAM, url), null, null);

		StringBuilder builder = new StringBuilder(url);

		try {
			if (!isUnitTest)
				session = getSession();
			DfLogger.info(this,
					String.format(STR_SESSION_UP, session.getSessionId()),
					null, null);

			// Do your custom logic with a session
			// Add the additional parameters for MyInsight:
			// &user=<USER_NAME>&repository=<REPOSITORY_NAME>&ticket=<PASSWORD>
			String userParameter = STR_PARAM_USER_FIRST;
			if(hasQuestionMarkParameter(url)) {
				userParameter = STR_PARAM_USER;
			}
			
			builder.append(String.format(userParameter,
					session.getLoginUserName()));
			builder.append(String.format(STR_PARAM_REPOSITORY,
					session.getDocbaseName()));
			builder.append(String.format(STR_PARAM_TICKET,
					session.getLoginTicket()));
		} finally {
			if (session != null) {
				if (session.isConnected()) {
					if (!isUnitTest)
						releaseSession(session);
				}
			}
		}

		DfLogger.info(this,
				String.format(STR_OUTPUT_PARAM, builder.toString()), null, null);
		DfLogger.info(this, String.format(STR_SERVICE + STR_END, this
				.getClass().getSimpleName()), null, null);
		return builder.toString();
	}

	/**
	 * Set the IDfSession object in this class for JUnit testing
	 * 
	 * @param session
	 *            is the session created in the JUnit test
	 */
	public void setSession(IDfSession session) {
		this.session = session;
	}
	
	/**
	 * Check if the URL already has a parameter
	 * @param strUrl is the URL to check
	 * @return the result from the check if the URL already has a parameter
	 */
	public static boolean hasQuestionMarkParameter(String strUrl) {
		boolean result = false;
		
		if(strUrl.contains(STR_QUESTION_MARK))
			result = true;
		
		return result;
	}
}
