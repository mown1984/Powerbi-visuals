## Debug JavaScript code on Power BI Portal
### To debug JavaScript code you need to: 
1. Add unmin=true parameter to your PowerBi portal URL. Your URL should look something like this: https://app.powerbi.com/groups/me/dashboards/{ID}?unmin=true 
2. Reload the page 
3. Open developer tools (F12 in most browsers) 
4. Go to “Console” tab. 
5. You will get few errors right after the page loads, but it's fine. 
6. Import your visual and start using it, keeping an eye on the developer tools window. If visual will throw any errors, they should appear in the console.
