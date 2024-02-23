import { Button } from "@mui/material";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


const ScheduleEvent = () => {
  const session = useSession(); // Obtain session information
  const supabase = useSupabaseClient(); // Initialize Supabase client
  const [isScheduling, setIsScheduling] = useState(false);

  // Function to sign in with Google
  const GoogleSignin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar.events",
        },
      });

      if (error) {
        throw new Error("Failed to sign in with Google: " + error.message);
      }
    } catch (error) {
      console.error("Google Sign-in Error:", error.message);
      alert("Failed to sign in with Google. Please try again later.");
    }
  };

  // Function to schedule an event
  const scheduleEvent = async (accessToken) => {
    setIsScheduling(true); // Set scheduling state to true

    const event = {
      summary: "Technical Interview at Playpower",
      description: "You have to give a technical interview at playpowerlabs.",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
          requestId: new Date().toISOString(),
        },
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.status} ${response.statusText}`);
      }

      setIsScheduling(false); // Reset scheduling state
      alert("Event scheduled successfully!");
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Failed to create event. Please try again later.");
    }
  };

  // Function to handle scheduling Google Calendar event
  const scheduleGoogleCalendarEvent = async () => {
    try {
      if (!session || !session.provider_token) {
        await GoogleSignin(); // Sign in with Google if not already signed in
      }
      await scheduleEvent(session.provider_token); // Schedule event with obtained token
    } catch (error) {
      console.error("Error scheduling event:", error);
      alert("Failed to schedule event. Please try again later.");
    }
  };

  return (
    <Button onClick={scheduleGoogleCalendarEvent} disabled={isScheduling}>
      {isScheduling ? <MoreHorizIcon /> : <CalendarMonthIcon />}
    </Button>
  );
};

export default ScheduleEvent;
