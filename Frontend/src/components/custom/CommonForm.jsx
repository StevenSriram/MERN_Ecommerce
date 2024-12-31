import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  handleSubmit,
  buttonText,
}) => {
  const renderComponent = (controlItem) => {
    const { componentType, ...inputProps } = controlItem;

    switch (componentType) {
      case "textarea":
        return (
          <Textarea
            {...inputProps}
            value={formData[inputProps.name]}
            onChange={(e) =>
              setFormData({ ...formData, [inputProps.name]: e.target.value })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [inputProps.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={inputProps.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {inputProps.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            {...inputProps}
            value={formData[inputProps.name]}
            onChange={(e) =>
              setFormData({ ...formData, [inputProps.name]: e.target.value })
            }
          />
        );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1 float-left">{controlItem.label}</Label>
            {renderComponent(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
