Basic form
----------

    const { Field } = Form;
    const yup = require('yup');
    const defaultRequiredStr = yup.string().default('').required('This field is required');
    const schema = yup.object({
      password: defaultRequiredStr,
      rememberme: yup.bool().default(false),
      username: defaultRequiredStr
    });
    
    <Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v) }>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-3 text-sm-right">
            <Label className="control-label required" htmlFor="username">Username</Label>
          </div>
          <div className="col-sm-6">
            <Field
              id="username"
              name="username"
              placeholder="What is your username?"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-3 text-sm-right">
            <Label className="control-label required" htmlFor="password">Password</Label>
          </div>
          <div className="col-sm-6">
            <Field
              id="password"
              name="password"
              placeholder="What is the secret phrase?"
              type="password"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <Field
              id="rememberme"
              name="rememberme"
              type="checkbox"
            />
            &nbsp;
            <Label for="rememberme">Remember me</Label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <Button className="btn-primary" type="submit">Sign in</Button>
            <Button className="btn-secondary" type="cancel">Cancel</Button>
          </div>
        </div>
      </div>
    </Form>

Checkbox
--------

    const { Field } = Form;
    const yup = require('yup');
    const schema = yup.object({
      check: yup.array().of(yup.string()).default(['First option'])
    });
    
    <Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v) }>
      <Field
        data={['First option', 'Add another', 'Nope']}
        disabled={['Nope']}
        multiple
        name="check"
        type="selectlist"
      />
    </Form>

Radio button
------------

    const { Field } = Form;
    const yup = require('yup');
    const schema = yup.object({
      optionRadios: yup.array().of(yup.string()).default(['Option one'])
    });
    
    <Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v) }>
      <Field
        data={['Option one', 'Option two', 'Option three is disabled']}
        disabled={['Option three is disabled']}
        name="optionRadios"
        type="selectlist"
      />
    </Form>
    
Select
------

    const { Field } = Form;
    const yup = require('yup');
    const schema = yup.object({
      position: yup.string().default('First')
    });
    
    <Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v) }>
      <div className="form-group">
        <Label className="control-label">Position</Label>
        <Field
          data={['First', 'Second', 'Third']}
          name="position"
          type="dropdownlist"
        />
     </div>
    </Form>
    
Textarea
--------

    const { Field } = Form;
    const yup = require('yup');
    const schema = yup.object({
      username: yup.string().default('')
    });
    
    <Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v) }>
      <div className="form-group">
        <Label className="control-label">Position</Label>
        <Field
          className="form-control"
          name="username"
          placeholder="Type some long description here..."
          type="textarea"
        />
     </div>
    </Form>
    
Toggle
------

    const { Field } = Form;
    const toClass = require('recompose').toClass;
    const yup = require('yup');
    const schema = yup.object({
      toggleDemo: yup.string().default('Shared')
    });
    
    const ToggleBase = ({ onChange, value }) => (
          <div className="toggle pad-all">
            <input
              checked={value==='Shared'}
              id="toggle-shared"
              name="toggle-demo"
              onChange={({ target }) => onChange(target.value)}
              type="radio"
              value="Shared"
            />
            <Label htmlFor="toggle-shared">Shared</Label>
            <input
              checked={value==='Private'}
              id="toggle-private"
              name="toggle-demo"
              onChange={({ target }) => onChange(target.value)}
              type="radio"
              value="Private"
            />
            <Label htmlFor="toggle-private">Private</Label>
          </div>
        );
        
    const Toggle = toClass(ToggleBase);
    
    const ToggleDarkBase = ({ onChange, value }) => (
      <div className="toggle bg-dark pad-all">
        <input
          checked={value==='Shared'}
          id="toggle-shared-dark"
          name="toggle-demo-dark"
          onChange={({ target }) => onChange(target.value)}
          type="radio"
          value="Shared"
        />
        <Label htmlFor="toggle-shared-dark">Shared</Label>
        <input
          checked={value==='Private'}
          id="toggle-private-dark"
          name="toggle-demo-dark"
          onChange={({ target }) => onChange(target.value)}
          type="radio"
          value="Private"
        />
        <Label htmlFor="toggle-private-dark">Private</Label>
      </div>
    );
    
    const ToggleDark = toClass(ToggleDarkBase);
    
    <Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v) }>
      <div className="row">
        <div className="col-sm-6">
          <Field name="toggleDemo" type={Toggle} />
        </div>
        <div className="col-sm-6">
          <Field name="toggleDemo" type={ToggleDark} />
        </div>
      </div>
    </Form>

Validation States
-----------------

    const { Field, Message } = Form;
    const yup = require('yup');
    const schema = yup.object({
      email: yup.string().default('').required('Please enter a valid email address'),
    });
        
    <Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v) }>
      <div className="form-group">
        <Label className="control-label required" htmlFor="email">Email Address</Label>
        <Field id="email" name="email" placeholder="john.doe@example.com" />
        <Message for="email" />
      </div>
      <div className="form-group">
        <Button className="btn-primary" type="submit">Submit</Button>
      </div>
    </Form>
