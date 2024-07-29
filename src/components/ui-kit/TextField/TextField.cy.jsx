import { BellAlertIcon } from '@heroicons/react/20/solid';
import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { TextArea, TextField } from './TextField';

const Container = ({ children }) => {
  return <div className="mx-auto w-64 py-64">{children}</div>;
};

it('should display the provided description', () => {
  const description = 'We will send you a confirmation email.';

  cy.render(
    <Container>
      <TextField type="email" label="Email" description={description} />
    </Container>,
  );

  cy.findByLabelText('Email').should('have.description', description);
  cy.findByText(description).should('be.visible');
});

it('should not display the description if not provided', () => {
  cy.render(
    <Container>
      <TextField type="email" label="Email" />
    </Container>,
  );

  cy.findByLabelText('Email').should('not.have.description');
  cy.get('[id^="textField-description-"]').should('not.exist');
});

it('should display the placeholder if provided', () => {
  cy.render(
    <Container>
      <TextField
        type="email"
        label="Email"
        placeholder="Enter your email address"
      />
    </Container>,
  );

  cy.findByLabelText('Email').should(
    'have.attr',
    'placeholder',
    'Enter your email address',
  );
});

it('should focus on input by clicking on the label', () => {
  cy.render(
    <Container>
      <TextField label="Email" />
    </Container>,
  );

  cy.findByText('Email').click();
  cy.findByLabelText('Email').should('be.focused');
});

it('should show error message for TextField if data is invalid', () => {
  const errorMessage = 'Email already exists.';

  cy.render(
    <Container>
      <TextField label="Email" invalid errorMessage={errorMessage} />
    </Container>,
  );

  cy.findByLabelText('Email').should('be.invalid');
  cy.findByLabelText('Email').should('have.errorMessage', errorMessage);
  cy.findByText(errorMessage).should('be.visible');
});

it('should not display the error message if value is valid', () => {
  const errorMessage = 'Email already exists.';

  cy.render(
    <Container>
      <TextField label="Email" errorMessage={errorMessage} />
    </Container>,
  );

  cy.findByLabelText('Email').should('be.valid');
  cy.findByLabelText('Email').should('not.have.errorMessage');
  cy.findByText(errorMessage).should('not.exist');
});

it('should not render the error message element if value is invalid but error message is not provided', () => {
  cy.render(
    <Container>
      <TextField label="Email" invalid />
    </Container>,
  );

  cy.findByLabelText('Email').should('be.invalid');
  cy.findByLabelText('Email').should('not.have.errorMessage');
  cy.get('[id^="textField-error-"]').should('not.exist');
});

it('should sr-only description if value is invalid and error message is provided', () => {
  const description = 'We will send you a confirmation email.';
  const errorMessage = 'Email already exists.';

  cy.render(
    <Container>
      <TextField
        label="Email"
        invalid
        errorMessage={errorMessage}
        description={description}
      />
    </Container>,
  );

  cy.findByLabelText('Email').should('be.invalid');
  cy.findByLabelText('Email').should('have.errorMessage', errorMessage);
  cy.findByLabelText('Email').should('have.description', description);

  cy.findByText(errorMessage).should('be.visible');
  cy.findByText(description).should('have.class', 'sr-only');
});

it('should display the description if value is invalid but error message is not provided', () => {
  const description = 'We will send you a confirmation email.';

  cy.render(
    <Container>
      <TextField label="Email" invalid description={description} />
    </Container>,
  );

  cy.findByLabelText('Email').should('be.invalid');
  cy.findByLabelText('Email').should('have.description', description);
  cy.findByText(description).should('be.visible');
});

it('Should show label for TextField', () => {
  cy.render(
    <Container>
      <TextField label="Email" />
    </Container>,
  );

  cy.findByLabelText('Email').should('have.name', 'Email');
});

it('should can update value', () => {
  const Wrapper = () => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return <TextField value={value} onChange={handleChange} label="Email" />;
  };

  cy.render(<Wrapper />);

  cy.findByLabelText('Email')
    .type('type in input')
    .should('have.value', 'type in input');
});

it('should can put type for TextField', () => {
  cy.render(
    <Container>
      <TextField label="Email" type="text" />
    </Container>,
  );

  cy.findByLabelText('Email').should('have.attr', 'type', 'text');
});

it('should can disable TextField', () => {
  const value = 'type your email address';
  cy.render(
    <Container>
      <TextField label="Email" disabled />
    </Container>,
  );

  cy.findByLabelText('Email').should('be.disabled');
  cy.findByLabelText('Email')
    .type(value, { force: true })
    .should('not.have.value');
});

it("should not be possible to change TextField's id", () => {
  cy.render(
    <Container>
      <TextField label="Email" id="2" />
    </Container>,
  );

  cy.findByLabelText('Email').should('not.have.attr', 'id', '2');
});

it('should render icons for TextField', () => {
  cy.render(
    <Container>
      <TextField StartIcon={PlusSmallIcon} EndIcon={BellAlertIcon} />
    </Container>,
  );

  cy.findByLabelText('start icon').should('exist');
  cy.findByLabelText('end icon').should('exist');
});

it('should render ReactNode type icon for TextField', () => {
  cy.render(
    <Container>
      <TextField StartIcon={PlusSmallIcon} EndIcon={BellAlertIcon} />
    </Container>,
  );

  cy.findByLabelText('start icon').should('exist');
  cy.findByLabelText('end icon').should('exist');
});

it('should display error message for textarea if data is invalid', () => {
  const errorMessage = 'Email already exists.';

  cy.render(
    <Container>
      <TextField label="Email" invalid errorMessage={errorMessage} asChild>
        <TextArea />
      </TextField>
    </Container>,
  );
  cy.findByLabelText('Email').should('be.invalid');
  cy.findByLabelText('Email').should('have.errorMessage', errorMessage);
  cy.findByText(errorMessage).should('be.visible');
});

it('should not display the error message for textarea if value is valid', () => {
  const errorMessage = 'Email already exists.';

  cy.render(
    <Container>
      <TextField label="Email" errorMessage={errorMessage} asChild>
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should('be.valid');
  cy.findByLabelText('Email').should('not.have.errorMessage');
  cy.findByText(errorMessage).should('not.exist');
});

it('Should show label for textarea', () => {
  cy.render(
    <Container>
      <TextField label="Email" asChild>
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should('have.name', 'Email');
});

it('should display the description for textarea', () => {
  const description = 'We will send you a confirmation email.';

  cy.render(
    <Container>
      <TextField label="Email" description={description} asChild>
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should('have.description', description);
  cy.findByText(description).should('exist');
});

it('should not display the description for textarea if not provided', () => {
  cy.render(
    <Container>
      <TextField type="email" label="Email" asChild>
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should('not.have.description');
  cy.get('[id^="textField-description-"]').should('not.exist');
});

it('should not render the error message element for textarea if value is invalid but error message is not provided', () => {
  cy.render(
    <Container>
      <TextField label="Email" invalid asChild>
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should('be.invalid');
  cy.findByLabelText('Email').should('not.have.errorMessage');
  cy.get('[id^="textField-error-"]').should('not.exist');
});

it('should display the description for textarea if value is invalid but error message is not provided', () => {
  const description = 'We will send you a confirmation email.';

  cy.render(
    <Container>
      <TextField label="Email" invalid description={description} asChild>
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should('be.invalid');
  cy.findByLabelText('Email').should('have.description', description);
  cy.findByText(description).should('be.visible');
});

it('should sr-only description for textarea if value is invalid and error message is provided', () => {
  const description = 'We will send you a confirmation email.';
  const errorMessage = 'Email already exists.';

  cy.render(
    <Container>
      <TextField
        label="Email"
        invalid
        errorMessage={errorMessage}
        description={description}
        asChild
      >
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should('be.invalid');
  cy.findByLabelText('Email').should('have.errorMessage', errorMessage);
  cy.findByLabelText('Email').should('have.description', description);

  cy.findByText(errorMessage).should('be.visible');
  cy.findByText(description).should('have.class', 'sr-only');
});

it('should display the placeholder for textarea if provided', () => {
  cy.render(
    <Container>
      <TextField
        type="email"
        label="Email"
        placeholder="Enter your email address"
        asChild
      >
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should(
    'have.attr',
    'placeholder',
    'Enter your email address',
  );
});

it('should can render textarea', () => {
  cy.render(
    <Container>
      <TextField label="Email" asChild>
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').then((element) => {
    expect(Cypress.$(element).get(0)).to.be.instanceof(HTMLTextAreaElement);
  });
});

it('should can update textarea value', () => {
  const Wrapper = () => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <Container>
        <TextField value={value} onChange={handleChange} label="Email" asChild>
          <TextArea />
        </TextField>
      </Container>
    );
  };

  cy.render(<Wrapper />);

  cy.findByLabelText('Email')
    .type('type in input')
    .should('have.value', 'type in input');
});

it('should render children if has asChild prop', () => {
  cy.render(
    <Container>
      <TextField label="Email" asChild>
        <TextArea />
      </TextField>
    </Container>,
  );

  cy.findByLabelText('Email').should('exist');
});