
const UserProfileContent = () => {
  return (
    <section className="min-h-screen bg-gray-200 flex justify-center w-full">
    <div className="container mx-auto py-5">
      <div className="flex justify-center items-center h-full">
        <div className="mx-2">
          <div className="bg-white rounded-md shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-5">
             
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-purple-500 text-center text-white rounded-tl-md rounded-bl-md">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar"
                  className="my-5 w-20 mx-auto rounded-full"
                />
                <h5 className="text-lg font-bold mb-1">Marie Horwitz</h5>
                <p className="mb-5">Web Designer</p>
                <i className="far fa-edit mb-5"></i>
              </div>

              <div className="lg:col-span-3 p-4">
                <h6 className="text-lg font-semibold">Information</h6>
                <hr className="mt-0 mb-4" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="mb-3">
                    <h6 className="text-sm font-semibold">Email</h6>
                    <p className="text-gray-500">info@example.com</p>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-sm font-semibold">Phone</h6>
                    <p className="text-gray-500">123 456 789</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default UserProfileContent;


