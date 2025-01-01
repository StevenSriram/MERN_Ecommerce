import { useEffect } from "react";
import { Loader } from "lucide-react";

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

import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/slices/authSlice";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  handleSubmit,
  buttonText,
}) => {
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

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

      {error && (
        <p className="text-sm text-center mt-3 font-medium text-red-500">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isLoading} className="mt-4 w-full">
        {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;
