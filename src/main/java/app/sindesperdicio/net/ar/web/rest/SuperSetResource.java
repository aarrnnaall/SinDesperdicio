package app.sindesperdicio.net.ar.web.rest;
import org.springframework.web.bind.annotation.*;

import liquibase.pro.packaged.n;

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
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
        OutputStream os = http.getOutputStream();
        os.write(out);
        os.flush();
        os.close();
        int responseCode = http.getResponseCode();
        if (responseCode == 302) { 
        Map<String, List<String>> headerFields = http.getHeaderFields();
 
        Set<String> headerFieldsSet = headerFields.keySet();
        Iterator<String> hearerFieldsIter = headerFieldsSet.iterator();
        String resutl="";
        String resutl2="";
             
        while (hearerFieldsIter.hasNext()) {
             
             String headerFieldKey = hearerFieldsIter.next();
             if ("Set-Cookie".equalsIgnoreCase(headerFieldKey)) {
                  
                 List<String> headerFieldValue = headerFields.get(headerFieldKey);
                  
                 for (String headerValue : headerFieldValue) {
                      
                    String[] fields = headerValue.split(";\\s*");
 
                    String cookieValue = fields[0];
                    String expires = null;
                    String path = null;
                    String domain = null;
                    boolean secure = false;
                     
                    // Parse each field
                    for (int j = 1; j < fields.length; j++) {
                        if ("secure".equalsIgnoreCase(fields[j])) {
                            secure = true;
                        }
                        else if (fields[j].indexOf('=') > 0) {
                            String[] f = fields[j].split("=");
                            if ("expires".equalsIgnoreCase(f[0])) {
                                expires = f[1];
                            }
                            else if ("domain".equalsIgnoreCase(f[0])) {
                                domain = f[1];
                            }
                            else if ("path".equalsIgnoreCase(f[0])) {
                                path = f[1];
                            }
                        }
                         
                    }
                    resutl2 = "cookieValue:" + cookieValue + "expires:" + expires+"path:" + path+"domain:" + domain+"secure:" + secure;
   
                    resutl = cookieValue;
            }    
            }    
            }
            URL url2 = new URL("http://superset.sindesperdicio.net.ar:8088/users/add");
            URLConnection con2 = url2.openConnection();
            HttpURLConnection http2 = (HttpURLConnection)con2;
            http2.setRequestMethod("POST"); // PUT is another valid option
            http2.setDoOutput(true);
            http2.setRequestProperty("Cookie", resutl);
            Map<String,String> arguments2 = new HashMap<>();
            arguments.put("first_name", "firstJhipster");
            arguments.put("last_name", "lastJhipster");
            arguments.put("username", "jhipster");
            arguments.put("email", "jhipster@gmail.com");
            arguments.put("password", "jhispter123");
            arguments.put("conf_password", "jhispter123");
            StringJoiner sj2 = new StringJoiner("&");
            for(Map.Entry<String,String> entry : arguments2.entrySet())
                sj2.add(URLEncoder.encode(entry.getKey(), "UTF-8") + "=" 
                     + URLEncoder.encode(entry.getValue(), "UTF-8"));
            byte[] out2 = sj2.toString().getBytes(StandardCharsets.UTF_8);
            int length2 = out2.length;    
            http2.setFixedLengthStreamingMode(length2);
            http2.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            http2.connect();
            OutputStream os2 = http2.getOutputStream();
            os2.write(out2);
            os2.flush();
            os2.close();
            int responseCode2 = http2.getResponseCode();
            if (responseCode2 == 302) {
                return "realizado";
            }
       /* String welcome = "http://superset.sindesperdicio.net.ar:8088/users/add";
        HttpURLConnection c = null;
        try {
            URL u = new URL(welcome);
            c = (HttpURLConnection) u.openConnection();
            c.setRequestMethod("GET");
            c.setRequestProperty("Content-length", "0");
            c.setRequestProperty("Cookie", resutl);
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
    
        }else{
            return "ERROR";
        }*/
    }
        return null;
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
    @GetMapping("/loginsuperset")
    public String login() throws java.io.IOException {
        String url = "http://superset.sindesperdicio.net.ar:8088/login?username=admin&redirect=/users/add";
        HttpURLConnection c = null;
            URL u = new URL(url);
            c = (HttpURLConnection) u.openConnection();
            c.setReadTimeout(99999999);
            c.setRequestMethod("GET");
            c.setRequestProperty("Accept", "*/*");
            c.setRequestProperty("Accept-Encoding", "gzip, deflate, br");
            c.setRequestProperty("Connection", "keep-alive");
            c.connect();
            //String cookies = c.getHeaderField("Set-Cookie");
            int status = c.getResponseCode();
            //String numCadena= status+"";
            if(status == 308){
                String newUrl2 = c.getHeaderField("Location");
                HttpURLConnection c2 = null;
                URL u2 = new URL(newUrl2);
                c2 = (HttpURLConnection) u2.openConnection();
                c2.setReadTimeout(99999999);
                c2.setRequestMethod("GET");
                c2.setRequestProperty("Accept", "*/*");
                c2.setRequestProperty("Accept-Encoding", "gzip, deflate, br");
                c2.setRequestProperty("Connection", "keep-alive");
                c2.connect(); 
                
                String cookies2 = c2.getHeaderField("Set-Cookie");
                int status2 = c2.getResponseCode();
                if (status2==200){
                    String cont = c2.toString();
                    String arraycont[]=cont.split("http");
                    String urlredirec="http"+arraycont[2]+"http"+arraycont[3];
                    return urlredirec;
                 
                }else{
                    String numCadena= status2+"";
                    return numCadena;
                }
            }else{
                String numCadena= status+"";
                return numCadena;
            }
            
                 /*    BufferedReader br = new BufferedReader(new InputStreamReader(c.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line+"\n");
                    }
                    br.close();
                    return sb.toString();*/
                  /*
                    HttpURLConnection conn2 = null;
                    String newUrl2 = c.getHeaderField("Location");
                	URL u3 = new URL(newUrl2);
                    conn2 = (HttpURLConnection) u3.openConnection();
                    conn2.setRequestMethod("GET");
                    conn2.setReadTimeout(99999999);
                    conn2.setRequestProperty("Cookie", c.getHeaderField("Set-Cookie"));
                    conn2.setRequestProperty("Accept-Encoding", "gzip, deflate, br");
                    conn2.setRequestProperty("Connection", "keep-alive");
                    
                    BufferedReader br2 = new BufferedReader(new InputStreamReader(conn2.getInputStream()));
                    StringBuilder sb2 = new StringBuilder();
                    String line2;
                    while ((line2 = br2.readLine()) != null) {
                        sb2.append(line2+"\n");
                    }
                    br2.close();
                    return sb2.toString();
                    */
                    //return array[0];
                                    
/*                    
                    HttpURLConnection conn = null;
                    String newUrl = "http://superset.sindesperdicio.net.ar:8088/users/add";

                    URL u2 = new URL(newUrl);
                    conn = (HttpURLConnection) u2.openConnection();
                    conn.setRequestProperty("Content-Encoding", "gzip");
                    conn.setRequestProperty("Content-Type", "text/html; charset=utf-8");
                    conn.setRequestProperty("Cookie", array[0]);
                    conn.connect();
                    BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line+"\n");
                    }
                    br.close();
                    return sb.toString();
  */                 
            
    
           
    }
}


