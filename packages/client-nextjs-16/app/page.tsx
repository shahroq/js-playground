"use client";
import { Button, Hero, Modal } from "@gpublic/comps";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section>
      <Hero title="Home">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Hero>
      <hr />

      {/* Modal */}
      <Button onClick={() => setShowModal(!showModal)}>Open Modal</Button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={"Header"}
        footer={<Button onClick={() => setShowModal(false)}>I Accept</Button>}
      >
        <>
          <h2 className="title">Welcome to Modal!</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            obcaecati cupiditate a optio in magnam, earum vero rerum deleniti
            cum totam eligendi sequi dolore. Alias perspiciatis tenetur
            consequuntur reiciendis quod!
          </p>
        </>
      </Modal>
    </section>
  );
}
