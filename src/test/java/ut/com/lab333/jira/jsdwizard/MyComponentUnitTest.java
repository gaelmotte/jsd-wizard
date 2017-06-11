package ut.com.lab333.jira.jsdwizard;

import org.junit.Test;
import com.lab333.jira.jsdwizard.api.MyPluginComponent;
import com.lab333.jira.jsdwizard.impl.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}