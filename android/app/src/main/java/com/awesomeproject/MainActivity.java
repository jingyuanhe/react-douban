package com.awesomeproject;
import com.facebook.react.ReactActivity;
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AwesomeProject";
    }
    //添加以下全部代码
   @Override
   protected void onCreate(Bundle savedInstanceState) {
       SplashScreen.show(this);  
       super.onCreate(savedInstanceState);
   }
}
