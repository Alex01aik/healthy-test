This is MVP "Helthy" API to make appointment to doctor

For starting app create .env with fields PORT, DB_URL, MIN_PERIOD, MAIL_HOST, MAIL_USER, MAIL_PASSWORD is nessesary

To create user use POST on route:

- /user/
  args: name, email

To find all users use GET on route:

- /user/all

To create doctor use POST on route:

- /doctor/
  args: name, working_hours

example working_hours:

```
working_hours: {
    Monday: {
        from: '8:00',
        to: '17:00'
    },
    ...
}
```

To find all doctors use GET on route:

- /doctor/all

To create appointment use POST on route:

- /appointment/

args: userId, doctorId, date, duration(in minutes)
