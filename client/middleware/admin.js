export default function({ store, redirect }) {
  const user = store.state.user.user;
  if (user == undefined) {
    return redirect("/");
  }
  if (user.admin == 0) {
    return redirect("/");
  }
}
