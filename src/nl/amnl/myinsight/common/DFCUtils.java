/**
 * Common class for handling DFC session handling
 */
package nl.amnl.myinsight.common;

import com.documentum.com.DfClientX;
import com.documentum.com.IDfClientX;
import com.documentum.fc.client.DfAuthenticationException;
import com.documentum.fc.client.DfIdentityException;
import com.documentum.fc.client.DfPrincipalException;
import com.documentum.fc.client.DfServiceException;
import com.documentum.fc.client.IDfClient;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.client.IDfSessionManager;
import com.documentum.fc.common.DfException;
import com.documentum.fc.common.IDfLoginInfo;

/**
 * @author bosa
 *
 */
public class DFCUtils {
	private static IDfSessionManager sessionManager;

	private static DFCUtils instance = new DFCUtils();

	/**
	 * Making the constructor private for the Singleton pattern
	 */
	private DFCUtils() {
	}

	/**
	 * Getting a single object instance for this class based on the Singleton
	 * pattern
	 * 
	 * @return the single object for this class
	 */
	public static DFCUtils getInstance() {
		return instance;
	}

	/**
	 * Creating a session manager for handling the sessions in a pool
	 * 
	 * @param repository
	 *            is the repository name to connect to
	 * @param username
	 *            is the username used for the connection
	 * @param password
	 *            is the password used for the connection
	 * @throws DfException
	 *             when a sessionManager can't be created
	 */
	public final void createSessionManager(String repository, String username,
			String password) throws DfException {
		IDfClientX clientx = new DfClientX();
		IDfClient client = clientx.getLocalClient();

		sessionManager = client.newSessionManager();

		IDfLoginInfo loginInfoObj = clientx.getLoginInfo();
		loginInfoObj.setUser(username);
		loginInfoObj.setPassword(password);
		loginInfoObj.setDomain(null);

		sessionManager.setIdentity(repository, loginInfoObj);
	}

	/**
	 * Getting a session out the pool from the session manager. A new session is
	 * created when not available in the pool
	 * 
	 * @param repository
	 *            is the repository name to make a session with
	 * @return the session object that made the connection
	 * @throws DfIdentityException
	 *             when a wrong username is given
	 * @throws DfAuthenticationException
	 *             when a wrong password is given
	 * @throws DfPrincipalException
	 *             when repository is down?
	 * @throws DfServiceException
	 *             when the login service is not available
	 */
	public final IDfSession getSessioFromSessionManager(String repository)
			throws DfIdentityException, DfAuthenticationException,
			DfPrincipalException, DfServiceException {
		return sessionManager.getSession(repository);
	}

	/**
	 * 
	 * @param session
	 *            is the session object to release back in the session manager
	 *            pool
	 * @throws DfIdentityException
	 *             when a wrong username is given
	 * @throws DfAuthenticationException
	 *             when a wrong password is given
	 * @throws DfPrincipalException
	 *             when repository is down?
	 * @throws DfServiceException
	 *             when the login service is not available
	 */
	public final void releaseSessioFromSessionManager(IDfSession session)
			throws DfIdentityException, DfAuthenticationException,
			DfPrincipalException, DfServiceException {
		if (session != null) {
			if (session.isConnected())
				sessionManager.release(session);
		}
	}
}
