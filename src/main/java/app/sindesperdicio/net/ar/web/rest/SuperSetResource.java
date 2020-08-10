package app.sindesperdicio.net.ar.web.rest;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

@RestController
@RequestMapping("/api")
public class SuperSetResource {
   
    @GetMapping("/superset/token")
    public String token() throws java.io.IOException {
        URL url = new URL("http://superset.sindesperdicio.net.ar:8088/login/");
        URLConnection con = url.openConnection();
        HttpURLConnection http = (HttpURLConnection)con;
        http.setRequestMethod("POST"); // PUT is another valid option
        http.setDoOutput(true);
        Map<String,String> arguments = new HashMap<>();
        arguments.put("username", "admin");
        arguments.put("password", "123"); // This is a fake password obviously
        StringJoiner sj = new StringJoiner("&");
        for(Map.Entry<String,String> entry : arguments.entrySet())
            sj.add(URLEncoder.encode(entry.getKey(), "UTF-8") + "=" 
                 + URLEncoder.encode(entry.getValue(), "UTF-8"));
        byte[] out = sj.toString().getBytes(StandardCharsets.UTF_8);
        int length = out.length;    
        http.setFixedLengthStreamingMode(length);
        http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.connect();
        try(OutputStream os = http.getOutputStream()) {
        os.write(out);
        return "Login";
        }
        catch(Exception e) {
        return "Error";
        }
    }   
    @GetMapping("/geocoding/{text}")
    public String geocoding(@PathVariable String text) throws java.io.IOException {
        String replacetext=text.replace(" ", "+");
        String url = "https://api.geocode.earth/v1/search?api_key=ge-6071d21825e9421c&text="+replacetext;
        HttpURLConnection c = null;
        try {
            URL u = new URL(url);
            c = (HttpURLConnection) u.openConnection();
            c.setRequestMethod("GET");
            c.setRequestProperty("Content-length", "0");
            c.setUseCaches(false);
            c.setAllowUserInteraction(false);
            c.connect();
            int status = c.getResponseCode();
    
            switch (status) {
                case 200:
                case 201:
                    BufferedReader br = new BufferedReader(new InputStreamReader(c.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line+"\n");
                    }
                    br.close();
                    return sb.toString();
            }
    
        } catch (MalformedURLException ex) {
 
        } catch (IOException ex) {
 
        } finally {
           if (c != null) {
              try {
                  c.disconnect();
              } catch (Exception ex) {
 
            }
           }
        }
        return null;
    }
      
}


