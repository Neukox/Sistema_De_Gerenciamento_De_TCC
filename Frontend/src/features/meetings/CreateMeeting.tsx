import CreateMeetingForm from "./create-form/CreateMeetingForm";

export default function CreateMeeting() {
  return <CreateMeetingForm onSubmit={(data) => console.log(data)} />;
}
