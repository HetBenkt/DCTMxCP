/**
 * Makes a custom function available in the xCP designer app
 * Notes: 	- Export as JAR and save in: <xcpApp-location>\content\modules\<jar_name>.jar
 * 			- Create an artifact in <xcpApp-location>\Java Modules\<module_name>.javamodule
 * 				- Sample can be found in Get_Ticket_Function.javamodule
 * 			- Restart designer
 * 			- Looks like these functions only are available in designer from server-size Artifacts
 * 				- E.g. Events on Business Objects
 */
package nl.amnl.myinsight.javafunctions;

import static nl.amnl.myinsight.javafunctions.IConstants.STR_END;
import static nl.amnl.myinsight.javafunctions.IConstants.STR_FUNCTION;
import static nl.amnl.myinsight.javafunctions.IConstants.STR_MYINSIGHT;
import static nl.amnl.myinsight.javafunctions.IConstants.STR_START;

import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;
import com.documentum.fc.common.DfLogger;
import com.emc.xcp.expressions.FunctionClass;
import com.emc.xcp.expressions.XcpFunction;
import com.emc.xcp.expressions.runtime.impl.ExpressionExecutionContext;

/**
 * @author bosa
 *
 */
public class GetTicketFunction implements FunctionClass {
	/**
	 * Gets the documentum DFC ticket
	 * @return the String representation of the DFC session ticket
	 */
	@XcpFunction(name = "getTicket", category = STR_MYINSIGHT)
	public static String getTicket() {
		GetTicketFunction gtf = new GetTicketFunction();
		DfLogger.info(gtf, String.format(STR_FUNCTION + STR_START, gtf
				.getClass().getSimpleName()), null, null);
		String result = "";
		IDfSession session = getSession();
		try {
			result = session.getLoginTicket();
		} catch (DfException e) {
			throw new RuntimeException("Could not execute custom funcation", e);
		}
		DfLogger.info(gtf, String.format(STR_FUNCTION + STR_END, gtf.getClass()
				.getSimpleName()), null, null);
		return result;
	}
	
	/**
	 * Get the session object of the current user
	 * @return the DFC session object
	 */
	private static IDfSession getSession() {
		Object value = ExpressionExecutionContext
				.getContext(ExpressionExecutionContext.SESSION);
		IDfSession session = null;
		if (value != null && value instanceof IDfSession) {
			session = (IDfSession) value;
		} else {
			throw new RuntimeException(
					"Docbase session cannot be null. Set the Expression execution context before invoking the function.");
		}
		return session;
	}
}
