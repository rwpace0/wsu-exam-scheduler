from datetime import datetime
import pytz

def parse_time_range(time_range_str):
        """
        Parses a time range string like "12:00-2:00 pm" into start and end time objects.
        Assumes that if the start time is missing an AM/PM indicator, it uses the one from the end time.
        """
        # Split into start and end parts
        parts = time_range_str.split('-')
        if len(parts) != 2:
            raise ValueError("Time range must be in the format 'start-end'")
        
        start_str = parts[0].strip()   # e.g., "12:00"
        end_str = parts[1].strip()     # e.g., "2:00 pm"
        
        # If the start doesn't contain am/pm, get it from the end part
        if not any(ind in start_str.lower() for ind in ['am', 'pm']):
            # Look for 'am' or 'pm' in the end string.
            if 'am' in end_str.lower():
                start_str += " am"
            elif 'pm' in end_str.lower():
                start_str += " pm"

        def standardize_time(time_str):
            if not any(c.isdigit() for c in time_str):  # Ensure it's not empty
                raise ValueError(f"Invalid time format: '{time_str}'")
            
            time_str = time_str.replace(" ", "") # Strip spaces
            time_str = time_str.replace("am", " am").replace("pm", " pm") # Add space before am/pm if not present

            if ":" not in time_str:  
                time_str = time_str.replace(" am", ":00 am").replace(" pm", ":00 pm") # Add ":00" if no minutes are present
            else:
                 time_str = time_str.replace(" :", ":") # Remove space before ":" if present
                 time_str = time_str.replace("am", "AM").replace("pm", "PM") # Standardize am/pm to uppercase

            return time_str
        
        start_str = standardize_time(start_str) 
        end_str = standardize_time(end_str)
        
        # Parse using the format "%I:%M %p"
        start_time = datetime.strptime(start_str, '%I:%M %p').time() 
        end_time = datetime.strptime(end_str, '%I:%M %p').time()
        
        return start_time, end_time

def combine_date_and_time(exam):
        """
        Combines the exam's date (exam.day) and the parsed time range from exam.time
        to produce full datetime objects.
        """
        if not exam.day or not exam.time:
            raise ValueError("Missing date or time data")
        
        start_time, end_time = parse_time_range(exam.time)

        # Combine the date and time into datetime objects
        start_dt = datetime.combine(exam.day, start_time)
        end_dt = datetime.combine(exam.day, end_time)
        
        # Set the timezone to Pacific Time
        pacific = pytz.timezone("America/Los_Angeles")
        start_dt = pacific.localize(start_dt)
        end_dt = pacific.localize(end_dt)

        return start_dt, end_dt