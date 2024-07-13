import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import { simpleAlert } from './SimpleAlert';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { HelpCircleIcon } from 'lucide-react';
import { CopyRuleStorage } from '@chrome-extension-boilerplate/storage';
import { useToast } from './components/ui/use-toast';
import { Badge } from './components/ui/badge';

const Options = () => {
  const [domains, setDomains] = useState([{ domain: '', selector: '' }]);
  const { toast } = useToast();

  const handleAddDomain = () => {
    setDomains([...domains, { domain: '', selector: '' }]);
  };

  const handleDomainChange = (index: number, field: 'domain' | 'selector', value: string) => {
    const updatedDomains = [...domains];
    updatedDomains[index][field] = value;
    setDomains(updatedDomains);
  };

  const handleRemoveDomain = (index: number) => {
    const updatedDomains = [...domains];
    updatedDomains.splice(index, 1);
    setDomains(updatedDomains);
  };

  const handleSave = async () => {
    await CopyRuleStorage.set({ rules: domains });
    toast({
      description: 'Your rules has been saved.',
    });
  };

  useEffect(() => {
    const getDomains = async () => {
      const rules = await CopyRuleStorage.get();
      setDomains(rules.rules);
    };
    getDomains();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <form className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="domains" className="block font-medium text-gray-700 text-lg">
              Rules
            </label>
            <Alert>
              <HelpCircleIcon color="green" className="h-4 w-4" />
              <AlertTitle>How to Use Domains and Selectors</AlertTitle>
              <AlertDescription>
                <div className="">
                  {/* Modified flex direction */}
                  <p>This extension operates on specific domains and uses CSS selectors to select page elements.</p>
                  <Badge className="mt-5" variant="secondary">
                    Domain Configuration
                  </Badge>
                  <div className="mt-2 text-xs">
                    <p>
                      The following domain pattern is used: <code>{` https://google.com/*`}</code>{' '}
                    </p>
                    <p>This pattern means that the extension will work on all pages within this domain.</p>
                  </div>
                  <Badge className="mt-4" variant="secondary">
                    Using Selectors
                  </Badge>
                  <div className="mt-2 text-xs">
                    <p>
                      To select the title of a link, you can use a selector like this: <code>{`.title`}</code>{' '}
                    </p>
                    <p>
                      This selector chooses elements with <code>{`class="title"`}</code>.
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            {domains.map((domain, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  id={`domain-${index}`}
                  name={`domain-${index}`}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter a domain"
                  value={domain.domain}
                  onChange={e => handleDomainChange(index, 'domain', e.target.value)}
                />
                <input
                  type="text"
                  id={`name-${index}`}
                  name={`name-${index}`}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter selectors to match"
                  value={domain.selector}
                  onChange={e => handleDomainChange(index, 'selector', e.target.value)}
                />
                <Button
                  variant="destructive"
                  type="button"
                  onClick={async () => {
                    const confirmed = await simpleAlert();
                    confirmed && handleRemoveDomain(index);
                  }}>
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={handleAddDomain} variant="secondary" type="button">
              Add Rule
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Button onClick={handleSave} type="button">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
