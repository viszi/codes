-- https://www.codewars.com/kata/58241d05e7a162c5b100010f

CREATE FUNCTION weekdays(d1 DATE, d2 DATE) RETURNS integer AS $$
 DECLARE interval integer := 0;
         date1 date := d1;
         date2 date := d2;
 BEGIN 
  SELECT count(*) INTO interval
  FROM generate_series(DATE(date1), DATE(date2), '1 day') as datevalues
  WHERE to_char(datevalues, 'ID') < '6';

  RETURN interval;
 END;
$$ LANGUAGE plpgsql;